import React, { useCallback, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ONLY_NUMBERS_REGEX_ONLY_G } from '../../const/regExp';

const MAX_VALUE = 10;

const StatsRow = props => {
    const { id, name: nameP, from: fromP, to: toP, onChangeStat, onDeleteRowHandler } = props;

    const [name, setName] = useState(nameP);
    const [from, setFrom] = useState(fromP);
    const [to, setTo] = useState(toP);

    const onChangeName = useCallback(e => {
        setName(e.target.value);
    }, []);

    const onChangeFrom = useCallback(e => {
        const value = e.target.value.match(ONLY_NUMBERS_REGEX_ONLY_G);

        const valueStr = value && value.join('');

        if (Number(valueStr) < MAX_VALUE) {
            setFrom(valueStr);
        }
    }, []);

    const onChangeTo = useCallback(e => {
        const value = e.target.value.match(ONLY_NUMBERS_REGEX_ONLY_G);

        const valueStr = value && value.join('');

        if (Number(valueStr) < MAX_VALUE) {
            setTo(valueStr);
        }
    }, []);

    const onNameBlurHandler = useCallback(() => {
        onChangeStat(id, 'name', name);
    }, [id, name]);

    const onFromBlurHandler = useCallback(() => {
        onChangeStat(id, 'from', from);
    }, [id, from]);

    const onToBlurHandler = useCallback(() => {
        onChangeStat(id, 'to', to);
    }, [id, to]);

    const deleteHandler = useCallback(() => {
        onDeleteRowHandler(id);
    }, [id]);

    return (
        <div className="inputsContainer">
            <button className="StatsDialog_dialog_removeBtn" onClick={deleteHandler}>
                <CloseIcon className="StatsDialog_dialog_crossIcon" />
            </button>
            <div className="StatsDialog_dialog_inputContainer">
                <span className="StatsDialog_dialog_label">Name</span>
                <input
                    type="text"
                    className="input create__item--input StatsDialog_dialog_input_name"
                    placeholder="Speed"
                    aria-label="Name"
                    value={name}
                    onChange={onChangeName}
                    onBlur={onNameBlurHandler}
                />
            </div>
            <div className="StatsDialog_dialog_inputContainer">
                <span className="StatsDialog_dialog_label">Value</span>
                <div className="StatsDialog_dialog_rangeContainer">
                    <input
                        type="text"
                        className="input create__item--input StatsDialog_dialog_input"
                        placeholder="3"
                        value={from}
                        onChange={onChangeFrom}
                        onBlur={onFromBlurHandler}
                    />
                    <div className="StatsDialog_dialog_input_separator">Of</div>
                    <input
                        type="text"
                        className="input create__item--input StatsDialog_dialog_input StatsDialog_dialog_right_input"
                        placeholder="5"
                        value={to}
                        onChange={onChangeTo}
                        onBlur={onToBlurHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(StatsRow);
