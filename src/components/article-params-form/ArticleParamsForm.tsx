import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { Text } from 'src/ui/text/Text';
import {
    fontFamilyOptions,
    fontSizeOptions,
    fontColors,
    backgroundColors,
    contentWidthArr,
    defaultArticleState,
    ArticleStateType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
    setArticleState: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: ArticleParamsFormProps) => {
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const [model, setModel] = useState<ArticleStateType>(defaultArticleState);

    const updateField =
        <T extends keyof ArticleStateType>(field: T) =>
        (value: ArticleStateType[T]) => {
            setModel((param) => ({
                ...param,
                [field]: value,
            }));
        };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setArticleState(model);
        setIsAsideOpen(false);
    };

    const handleReset = () => {
        setModel(defaultArticleState);
        setArticleState(defaultArticleState);
    };

    return (
        <>
            <ArrowButton
                isOpen={isAsideOpen}
                onClick={() => setIsAsideOpen(!isAsideOpen)}
            />
            {isAsideOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsAsideOpen(false)}
                >
                    <aside
                        className={clsx(styles.container, {
                            [styles.container_open]: isAsideOpen,
                        })}
                        onClick={(evt) => evt.stopPropagation()}
                    >
                        <form
                            className={styles.form}
                            onSubmit={handleSubmit}
                            onReset={handleReset}
                        >
                            <Text as="h2" size={31} weight={800} family="open-sans" align="center" uppercase>
                                Задайте параметры
                            </Text>
                            <div className={styles.field}>
                                <Text as="label" size={12} weight={800} uppercase family="open-sans">
                                    Шрифт
                                </Text>
                                <Select
                                    options={fontFamilyOptions}
                                    selected={model.fontFamilyOption}
                                    onChange={updateField('fontFamilyOption')}
                                />
                            </div>
                            <div className={styles['spacer-s']} />
                            <div className={styles.field}>
                                <Text as="label" size={12} weight={800} uppercase family="open-sans">
                                    Размер текста
                                </Text>
                                <Select
                                    options={fontSizeOptions}
                                    selected={model.fontSizeOption}
                                    onChange={updateField('fontSizeOption')}
                                />
                            </div>
                            <div className={styles['spacer-m']} />
                            <div className={styles.field}>
                                <Text as="label" size={12} weight={800} uppercase family="open-sans">
                                    Цвет текста
                                </Text>
                                <Select
                                    options={fontColors}
                                    selected={model.fontColor}
                                    onChange={updateField('fontColor')}
                                />
                            </div>
                            <div className={styles['spacer-s']} />
                            <div className={styles.field}>
                                <Text as="label" size={12} weight={800} uppercase family="open-sans">
                                    Цвет фона
                                </Text>
                                <Select
                                    options={backgroundColors}
                                    selected={model.backgroundColor}
                                    onChange={updateField('backgroundColor')}
                                />
                            </div>
                            <div className={styles['spacer-s']} />
                            <div className={styles.field}>
                                <Text as="label" size={12} weight={800} uppercase family="open-sans">
                                    Ширина контента
                                </Text>
                                <Select
                                    options={contentWidthArr}
                                    selected={model.contentWidth}
                                    onChange={updateField('contentWidth')}
                                />
                            </div>
                            <div className={styles['spacer-l']} />
                            <div className={styles.bottomContainer}>
                                <Button title="Сбросить" htmlType="reset" type="clear" />
                                <Button title="Применить" htmlType="submit" type="apply" />
                            </div>
                        </form>
                    </aside>
                </div>
            )}
        </>
    );
};