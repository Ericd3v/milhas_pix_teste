      🌌 Projeto Aether: Domínio de Milhas & Ofertas 🌌
      "Onde o código é rápido, a tipagem é estrita e a performance é a única métrica que importa."

      Este repositório contém o frontend da nossa aplicação, construída para ser extremamente rápida e livre de erros de tipagem. Utilizando a combinação mais potente de ferramentas modernas, garantimos que cada componente funcione com precisão cirúrgica.

      ⚡ Tecnologias de Elite (The Stack)
      Tecnologia	Função Principal	Status de Otimização
      React	Biblioteca de UI de ponta.	Configurado para Fast Refresh
      TypeScript	Garante segurança e tipagem estrita.	Strict Mode Ativo
      Vite	Empacotador e Servidor de Desenvolvimento.	HMR (Hot Module Replacement) Otimizado
      ESLint	Guardião da Qualidade do Código.	Type-Aware Rules (Nível Punitivo)

      Exportar para as Planilhas
      🚀 Como Iniciar a Operação (Dev Setup)
      Pré-requisitos
      Certifique-se de ter Node.js (LTS) e npm (ou Yarn/pnpm) instalados.

      1. Clonar e Instalar
      Bash

      # Clone este repositório
      git clone https://github.com/Ericd3v/Milhas-pix.git

      # Navegue até o diretório do projeto
      cd ./Minhas_Pix/milhas_pix

      # Instale as dependências
      npm install
      2. Ativar o Servidor de Desenvolvimento
      O Vite inicia o servidor de desenvolvimento com HMR (Hot Module Replacement) ativado, garantindo que as mudanças no código sejam injetadas quase instantaneamente.

      Bash

      npm run dev
      O servidor estará rodando em http://localhost:5173/ (ou outra porta disponível).

      ⚙️ Configuração para Produtividade Máxima
      1. O Compilador React (O Ponto de Virada)
      Para atingir a performance máxima em produção e evitar re-renderizações desnecessárias, recomendamos a ativação do React Compiler (anteriormente conhecido como React Forget).

      🚨 Atenção: A ativação do compilador pode impactar ligeiramente a performance de dev e build. Siga a documentação oficial para integrá-lo:

      ➡️ Documentação de Instalação do React Compiler

      2. O Domínio Absoluto do ESLint (Type-Aware Linting)
      Nosso linter não perdoa. Ele está configurado para regras de tipagem rigorosas usando eslint-plugin-react-x e @typescript-eslint/eslint-plugin.

      Para habilitar as regras mais estritas e as verificações baseadas em tipagem, use esta configuração no seu eslint.config.js:

      JavaScript

      // eslint.config.js - Configuração Stricta (Recomendada)
      import tseslint from 'typescript-eslint'
      import reactX from 'eslint-plugin-react-x'
      import reactDom from 'eslint-plugin-react-dom'

      export default defineConfig([
        globalIgnores(['dist']),
        {
          files: ['**/*.{ts,tsx}'],
          extends: [
            // Tipagem
            tseslint.configs.strictTypeChecked, 
            // Estilo de Código
            tseslint.configs.stylisticTypeChecked,
            // Regras Específicas React (Performance & Erros Comuns)
            reactX.configs['recommended-typescript'],
            reactDom.configs.recommended,
          ],
          languageOptions: {
            parserOptions: {
              project: ['./tsconfig.node.json', './tsconfig.app.json'],
              tsconfigRootDir: import.meta.dirname,
            },
          },
        },
      ])
      📦 Construção e Implantação (Deployment)
      Para preparar os artefatos de produção otimizados:

      Bash

      # Executa o build de produção (artefatos na pasta 'dist')
      npm run build
      Artefatos Gerados: A pasta dist contém a versão minificada, otimizada e pronta para o servidor que será usada em produção.