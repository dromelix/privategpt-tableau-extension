# PrivateGPT Tableau Extension

1. Clone PrivateGPT repository
- Change settings
  server:
    cors:
      enabled: true
  llm:
    context_window: 100000
    tokenizer: TinyPixel/qwen-1.8B-OrcaMini
  local:
    llm_hf_repo_id: KatyTheCutie/qwen-1.8B-OrcaMini-GGUF
    llm_hf_model_file: qwen-1.8b-OrcaMini-Q8_0.gguf
- Update transformers package to the latest
poetry add transformers@latest
- Change script/setup python script
Add "trust_remote_code=True," before Line 46, add new paramter to AutoTokenizer.from_pretrained


- Run PrivateGPT project

2. Add PrivateGPT's server url (default is http://localhost:8001) as proxy in Xampp.
https://gist.github.com/codesorter2015/ece7dd46144d9fd0d6e01f2480ba7eb8

3. In the extension, open `config.js` and change backend server url.
And you can change the system prompt if you want.
