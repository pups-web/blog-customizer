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
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
    articleState,
    setArticleState,
}: {
    articleState: any;
    setArticleState: (settings: any) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formState, setFormState] = useState({
        fontFamily: articleState.fontFamilyOption.value,
        fontSize: articleState.fontSizeOption.value,
        fontColor: articleState.fontColor.value,
        backgroundColor: articleState.backgroundColor.value,
        contentWidth: articleState.contentWidth.value,
    });

    const toggleSidebar = () => setIsOpen((v) => !v);

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        setArticleState({
            ...defaultArticleState,
            fontFamilyOption: fontFamilyOptions.find((opt) => opt.value === formState.fontFamily) || defaultArticleState.fontFamilyOption,
            fontSizeOption: fontSizeOptions.find((opt) => opt.value === formState.fontSize) || defaultArticleState.fontSizeOption,
            fontColor: fontColors.find((opt) => opt.value === formState.fontColor) || defaultArticleState.fontColor,
            backgroundColor: backgroundColors.find((opt) => opt.value === formState.backgroundColor) || defaultArticleState.backgroundColor,
            contentWidth: contentWidthArr.find((opt) => opt.value === formState.contentWidth) || defaultArticleState.contentWidth,
        });
        setIsOpen(false);
    };

    const handleReset = () => {
        setFormState({
            fontFamily: defaultArticleState.fontFamilyOption.value,
            fontSize: defaultArticleState.fontSizeOption.value,
            fontColor: defaultArticleState.fontColor.value,
            backgroundColor: defaultArticleState.backgroundColor.value,
            contentWidth: defaultArticleState.contentWidth.value,
        });
        setArticleState(defaultArticleState);
    };

    const handleChange = (key: string, value: string) => {
        setFormState((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'flex-start', position: 'fixed', left: 0, top: 0, zIndex: 1300 }}>
                <ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
                {isOpen && (
                    <>
                        <aside
                            className={clsx(styles.container, { [styles.container_open]: isOpen })}
                            style={{
                                zIndex: 1301,
                                position: 'relative',
                            }}
                        >
                            <form className={styles.form} onSubmit={handleApply}>
                                <Text as="h2" size={31} weight={800} family="open-sans" align="center" uppercase>
                                    Задайте параметры
                                </Text>
                                <div className={styles.field}>
                                    <Text
                                        as="label"
                                        size={12}
                                        weight={800}
                                        uppercase
                                        family="open-sans"
                                    >
                                        Шрифт
                                    </Text>
                                    <Select
                                        options={fontFamilyOptions}
                                        selected={fontFamilyOptions.find((param) => param.value === formState.fontFamily) || null}
                                        onChange={(option) => handleChange('fontFamily', option.value)}
                                    />
                                </div>
                                <div style={{ height: 50 }} />
                                <div className={styles.field}>
                                    <Text
                                        as="label"
                                        size={12}
                                        weight={800}
                                        uppercase
                                        family="open-sans"
                                    >
                                        Размер текста
                                    </Text>
                                    <Select
                                        options={fontSizeOptions}
                                        selected={fontSizeOptions.find((param) => param.value === formState.fontSize) || null}
                                        onChange={(option) => handleChange('fontSize', option.value)}
                                    />
                                </div>
                                <div style={{ height: 100 }} />
                                <div className={styles.field}>
                                    <Text
                                        as="label"
                                        size={12}
                                        weight={800}
                                        uppercase
                                        family="open-sans"
                                    >
                                        Цвет текста
                                    </Text>
                                    <Select
                                        options={fontColors}
                                        selected={fontColors.find((param) => param.value === formState.fontColor) || null}
                                        onChange={(option) => handleChange('fontColor', option.value)}
                                    />
                                </div>
                                <div style={{ height: 50 }} />
                                <div className={styles.field}>
                                    <Text
                                        as="label"
                                        size={12}
                                        weight={800}
                                        uppercase
                                        family="open-sans"
                                    >
                                        Цвет фона
                                    </Text>
                                    <Select
                                        options={backgroundColors}
                                        selected={backgroundColors.find((param) => param.value === formState.backgroundColor) || null}
                                        onChange={(option) => handleChange('backgroundColor', option.value)}
                                    />
                                </div>
                                <div style={{ height: 50 }} />
                                <div className={styles.field}>
                                    <Text
                                        as="label"
                                        size={12}
                                        weight={800}
                                        uppercase
                                        family="open-sans"
                                    >
                                        Ширина контента
                                    </Text>
                                    <Select
                                        options={contentWidthArr}
                                        selected={contentWidthArr.find((param) => param.value === formState.contentWidth) || null}
                                        onChange={(option) => handleChange('contentWidth', option.value)}
                                    />
                                </div>
                                <div style={{ height: 207 }} />
                                <div className={styles.bottomContainer}>
                                    <Button title="Сбросить" htmlType="button" type="clear" onClick={handleReset} />
                                    <Button title="Применить" htmlType="submit" type="apply" />
                                </div>
                            </form>
                        </aside>
                        <div
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                zIndex: 1300,
                                background: 'transparent',
                            }}
                        />
                    </>
                )}
            </div>
        </>
    );
};