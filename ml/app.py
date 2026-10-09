"""Visual search service: CNN (ResNet-18, ImageNet weights) embeddings + cosine similarity over assets/img/t/*.webp"""
import io, os, glob
import numpy as np, torch, torchvision
from fastapi import FastAPI, File, UploadFile
from PIL import Image
app = FastAPI(title="AANU visual search")
net = torchvision.models.resnet18(weights=torchvision.models.ResNet18_Weights.IMAGENET1K_V1); net.fc = torch.nn.Identity(); net.eval()
T = torchvision.transforms
tf = T.Compose([T.Resize(256), T.CenterCrop(224), T.ToTensor(), T.Normalize([.485, .456, .406], [.229, .224, .225])])
IMG = os.environ.get("IMG_DIR", "/data/t"); idx = {"names": [], "vec": None}
def emb(im):
    with torch.no_grad(): v = net(tf(im.convert("RGB")).unsqueeze(0))[0].numpy()
    return v / (np.linalg.norm(v) + 1e-9)
def build():
    fs = sorted(glob.glob(os.path.join(IMG, "*.webp"))); idx["names"] = [os.path.basename(f) for f in fs]
    idx["vec"] = np.stack([emb(Image.open(f)) for f in fs]) if fs else None; return len(fs)
@app.on_event("startup")
def start(): build()
@app.post("/reindex")
def reindex(): return {"indexed": build()}
@app.get("/health")
def health(): return {"ok": True, "indexed": len(idx["names"])}
@app.post("/search")
async def search(file: UploadFile = File(...), k: int = 12):
    if idx["vec"] is None: return {"results": []}
    q = emb(Image.open(io.BytesIO(await file.read()))); s = idx["vec"] @ q; o = np.argsort(-s)[:k]
    return {"results": [{"img": idx["names"][i], "score": float(s[i])} for i in o]}
