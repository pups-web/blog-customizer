import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import {
    fontFamilyOptions,
    fontSizeOptions,
    fontColors,
    defaultArticleState,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

const contentWidthOptions = [
    { value: '1394px', title: 'Широкий', className: '' },
    { value: '948px', title: 'Узкий', className: '' },
];

export const ArticleParamsForm = ({
    onApply,
    onReset,
}: {
    onApply: (settings: any) => void;
    onReset: () => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Используем defaultArticleState для начальных значений
    const [formState, setFormState] = useState({
        fontFamily: defaultArticleState.fontFamilyOption.value,
        fontSize: defaultArticleState.fontSizeOption.value,
        fontColor: defaultArticleState.fontColor.value,
        backgroundColor: defaultArticleState.backgroundColor.value,
        contentWidth: defaultArticleState.contentWidth.value,
    });

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        // Собираем объект в формате defaultArticleState
        onApply({
            ...defaultArticleState,
            fontFamilyOption:
                fontFamilyOptions.find((opt) => opt.value === formState.fontFamily) ||
                defaultArticleState.fontFamilyOption,
            fontSizeOption:
                fontSizeOptions.find((opt) => opt.value === formState.fontSize) ||
                defaultArticleState.fontSizeOption,
            fontColor:
                fontColors.find((opt) => opt.value === formState.fontColor) ||
                defaultArticleState.fontColor,
            backgroundColor:
                fontColors.find((opt) => opt.value === formState.backgroundColor) ||
                defaultArticleState.backgroundColor,
            contentWidth:
                contentWidthOptions.find((opt) => opt.value === formState.contentWidth) ||
                defaultArticleState.contentWidth,
        });
    };

    const handleReset = () => {
        setFormState({
            fontFamily: defaultArticleState.fontFamilyOption.value,
            fontSize: defaultArticleState.fontSizeOption.value,
            fontColor: defaultArticleState.fontColor.value,
            backgroundColor: defaultArticleState.backgroundColor.value,
            contentWidth: defaultArticleState.contentWidth.value,
        });
        onReset();
    };

    const handleChange = (key: string, value: string) => {
        setFormState((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <>
            <ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
            <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
                <form className={styles.form} onSubmit={handleApply}>
                    <h2 className={styles.title}>Задайте параметры</h2>
                    <div className={styles.field}>
                        <label className={styles.label}>Шрифт</label>
                        <Select
                            options={fontFamilyOptions}
                            selected={
                                fontFamilyOptions.find((param) => param.value === formState.fontFamily) || null
                            }
                            onChange={(option) => handleChange('fontFamily', option.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Размер текста</label>
                        <Select
                            options={fontSizeOptions}
                            selected={
                                fontSizeOptions.find((param) => param.value === formState.fontSize) || null
                            }
                            onChange={(option) => handleChange('fontSize', option.value)}
                        />
                    </div>
                    <div className={`${styles.field} ${styles.colorField}`}>
                        <label className={styles.label}>Цвет текста</label>
                        <Select
                            options={fontColors}
                            selected={
                                fontColors.find((param) => param.value === formState.fontColor) || null
                            }
                            onChange={(option) => handleChange('fontColor', option.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Цвет фона</label>
                        <Select
                            options={fontColors}
                            selected={
                                fontColors.find((param) => param.value === formState.backgroundColor) || null
                            }
                            onChange={(option) => handleChange('backgroundColor', option.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Ширина контента</label>
                        <Select
                            options={contentWidthOptions}
                            selected={
                                contentWidthOptions.find((param) => param.value === formState.contentWidth) || null
                            }
                            onChange={(option) => handleChange('contentWidth', option.value)}
                        />
                    </div>
                    <div className={styles.bottomContainer}>
                        <Button title="Сбросить" htmlType="button" type="clear" onClick={handleReset} />
                        <Button title="Применить" htmlType="submit" type="apply" />
                    </div>
                </form>
            </aside>
        </>
    );
};