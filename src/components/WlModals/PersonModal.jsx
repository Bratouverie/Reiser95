import React from 'react';
import Joi from '@hapi/joi';
import { useForm } from 'react-hook-form';
import { Form } from '../../common/Form';
import { TextField } from '../../common/TextField';
import { useValidationResolver } from '../../hooks/useValidationResolver';

import './index.css';

const schema = Joi.object({
    filed_1: Joi.string().required(),
    filed_2: Joi.string().required(),
});

const PersonModal = (props) => {
    const { onClose, onCreate, isLoading } = props;

    const { validationResolver } = useValidationResolver(schema);

    const {
        register,
        handleSubmit: onSubmitForm,
        formState: { errors: formErrors },
    } = useForm({
        validationResolver,
        mode: 'onSubmit',
    });

    const handleSubmit = onSubmitForm((data) => {
        console.log({ data });
    });

    return (
        <>
            <div className="modal__content">
                <div className="modal__content--top">
                    <h2 className="modal__title">Get on Whitelist</h2>

                    <img
                        src="/assets/img/cross.svg"
                        alt="Cross"
                        className="modal__close"
                        onClick={onClose}
                    />
                </div>

                <div className="modal__content--bottom">
                    <p className="blue">Dojacat NFT Super Story</p>

                    <p className="create__item--text">
                        To get on Whitelist specify data for feedback
                    </p>
                    <Form onSubmit={handleSubmit} className="whitelist_form">
                        <TextField
                            label="Specify data for feedback"
                            placeholder="Email"
                            name="filed_1"
                            inputProps={{ ...register('filed_1', { required: true }) }}
                            error={formErrors && formErrors['filed_1']}
                        />

                        <TextField
                            label="Discord name"
                            placeholder="Discord name"
                            name="filed_2"
                            inputProps={{ ...register('filed_2', { required: true }) }}
                            error={formErrors && formErrors['filed_2']}
                        />

                        <div className="modal__buttons">
                            {isLoading ? (
                                <button className="button button__default" disabled>
                                    Loading...
                                </button>
                            ) : (
                                <button type="submit" className="button button__default">
                                    Start Checking
                                </button>
                            )}
                        </div>
                    </Form>

                    <div className="modal__info">
                        <div className="modal__info--block">
                            After confirmation, the information will be sent to the moderator for
                            verification. If verified successfully, you will receive an email with
                            further instructions. Whitelist cannot be sold or transferred to another
                            person. It will be attached to your wallet. Only you will be able to
                            mint NFT of this collection. After confirmation, the information will be
                            sent to the moderator for verification. If verified successfully, you
                            will receive an email with further instructions. Whitelist cannot be
                            sold or transferred to another person. It will be attached to your
                            wallet. Only you will be able to mint NFT of this collection.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(PersonModal);
