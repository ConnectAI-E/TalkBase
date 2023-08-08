import React from 'react';

function Footer() {
    return (
            <p className="text-center text-xs text-gray-400">
                Built with{ ' ' }
                <a
                    href="https://github.com/microsoft/TypeChat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-black"
                >
                    TypeChat
                </a>{ ' ' }
                and{ ' ' }
                <a
                    href="https://sdk.vercel.ai/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-black"
                >
                    Vercel AI SDK
                </a>
                { ' ' }
                <a
                    href="https://github.com/ConnectAI-E/Chat-Calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-black"
                >
                    Star the repo on GitHub
                </a>{ ' ' }
                .
            </p>
    );
}

export default Footer;
