import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
    const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

    const handleApply = (settings: ArticleStateType) => {
        setArticleState(settings);
    };

    const handleReset = () => {
        setArticleState(defaultArticleState);
    };

    return (
        <main
            className={clsx(styles.main)}
            style={{
                fontFamily: articleState.fontFamilyOption.value,
                color: articleState.fontColor.value,
                backgroundColor: articleState.backgroundColor.value,
                maxWidth: articleState.contentWidth.value,
                fontSize: articleState.fontSizeOption.value,
                margin: '0 auto',
            }}
        >
            <ArticleParamsForm onApply={handleApply} onReset={handleReset} />
            <Article />
        </main>
    );
};

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);