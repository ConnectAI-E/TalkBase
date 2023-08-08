import React from 'react';
import PropTypes from 'prop-types';
import {githubUrl} from '../constant';

Header.propTypes = {

};

function Header() {
    return (
        <div
            className="flex flex-col space-y-1 p-4 border sm:p-10 text-sm px-10">
            <h1 className="text-sm font-semibold text-black">
                Welcome to TalkBase!
            </h1>
            <p className="text-gray-500">
                This is an{ ' ' }
                <a
                    href={ githubUrl }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                >
                    open-source
                </a>{ ' ' }
                AI chatbot that uses{ ' ' }
                <a
                    href="https://github.com/microsoft/TypeChat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                >
                    TypeChat
                </a>{ ' ' }
                and{ ' ' }
                <a
                    href="https://sdk.vercel.ai/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                >
                    Vercel
                </a>{ ' ' }
                to write date to lark-base by natural language.
            </p>
            <p>
                Project is made by { ' ' }
                <a
                    href="https://github.com/ConnectAI-E"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                >
                    ConnectAI
                </a>{ ' ' } with ❤️ .

            </p>
        </div>
    );
}

export default Header;
