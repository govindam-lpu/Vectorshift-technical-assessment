from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: list
    edges: list

def is_dag(nodes, edges):
    graph = {n['id']: [] for n in nodes}
    for e in edges:
        graph[e['source']].append(e['target'])
    
    color = {n['id']: 0 for n in nodes}
    
    def dfs(node):
        color[node] = 1
        for neighbor in graph[node]:
            if color[neighbor] == 1:
                return False
            if color[neighbor] == 0:
                if not dfs(neighbor):
                    return False
        color[node] = 2
        return True
    
    for node in graph:
        if color[node] == 0:
            if not dfs(node):
                return False
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges
    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': is_dag(nodes, edges)
    }