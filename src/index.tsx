import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
    const handleApply = (settings: any) => {
    Object.entries(settings).forEach(([key, value]) => {
        // Преобразование ключей в формат CSS-переменных
        const cssVariableName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        document.documentElement.style.setProperty(cssVariableName, String(value));
    });
};
    const handleReset = () => {
    Object.entries(defaultArticleState).forEach(([key, value]) => {
        const cssVariableName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        document.documentElement.style.setProperty(cssVariableName, String(value.value));
    });
};
    return (
        <main
            className={clsx(styles.main)}>
           
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
