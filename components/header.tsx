import React from 'react';
import PropTypes from 'prop-types';
import {githubUrl} from '../constant';
import {useTranslation} from 'next-i18next';

Header.propTypes = {
};

function Header() {

    const { t, i18n } = useTranslation('common');
    return (
        <div
            className="flex flex-col space-y-1 p-4 border sm:p-10 text-sm px-10 select-none">
            <h1 className="text-sm font-semibold text-black">
                {t('welcome')} TalkBase!
            </h1>
            <p className="text-gray-500">
                {t('thisisan')}{ ' ' }
                <a
                    href={ githubUrl }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                >
                    {t('open-source')}
                </a>{ ' ' }
                {t('aichatbot')}{ ' ' }
                <a
                    href="https://github.com/microsoft/TypeChat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                >
                    {t('typechat')}
                </a>{ ' ' }
                {t('and')}{ ' ' }
                <a
                    href="https://sdk.vercel.ai/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                >
                    {t('vercel')}
                </a>{ ' ' }
                {t('towrite')}
            </p>
            <p>
                {t('project')} { ' ' }
                <a
                    href="https://github.com/ConnectAI-E"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                >
                    ConnectAI
                </a>{ ' ' } {t('with')} .

            </p>
        </div>
    );
}

export default Header;
