import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { fontFamilyOptions, fontSizeOptions, fontColors } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({ onApply, onReset }: { onApply: (settings: any) => void; onReset: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formState, setFormState] = useState({
        fontFamily: fontFamilyOptions[0].value,
        fontSize: fontSizeOptions[0].value,
        fontColor: fontColors[0].value,
    });

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        onApply(formState); // Передача настроек на страницу
    };

    const handleReset = () => {
        setFormState({
            fontFamily: fontFamilyOptions[0].value,
            fontSize: fontSizeOptions[0].value,
            fontColor: fontColors[0].value,
        }); // Сброс состояния формы
        onReset(); // Сброс настроек на странице
    };

    const handleChange = (key: string, value: string) => {
        setFormState((prevState) => ({ ...prevState, [key]: value }));
    };

    return (
        <>
            <ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
            <aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
                <form className={styles.form} onSubmit={handleApply}>
                    <div className={styles.field}>
                        <label>Шрифт</label>
                        <Select
                            options={fontFamilyOptions}
                            selected={fontFamilyOptions.find((param) => param.value === formState.fontFamily) || null}
                            onChange={(option) => handleChange('fontFamily', option.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Размер текста</label>
                        <Select
                            options={fontSizeOptions}
                            selected={fontSizeOptions.find((param) => param.value === formState.fontSize) || null}
                            onChange={(option) => handleChange('fontSize', option.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Цвет текста</label>
                        <Select
                            options={fontColors}
                            selected={fontColors.find((param) => param.value === formState.fontColor) || null}
                            onChange={(option) => handleChange('fontColor', option.value)}
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
