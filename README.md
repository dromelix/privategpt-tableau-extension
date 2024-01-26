# PrivateGPT Tableau Extension

1. Clone PrivateGPT repository
- Change settings
  server/cors/enabled -> true
  llm/context_window -> 100000
- Run PrivateGPT project

2. Add PrivateGPT's server url (default is http://localhost:8001) as proxy in Xampp.
https://gist.github.com/codesorter2015/ece7dd46144d9fd0d6e01f2480ba7eb8

3. In the extension, open `config.js` and change backend server url.
And you can change the system prompt if you want.
