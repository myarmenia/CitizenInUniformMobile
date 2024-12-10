import React, { useEffect, useRef } from 'react';
import { View, Button } from 'react-native';
import Recaptcha, { RecaptchaRef } from 'react-native-recaptcha-that-works';


interface IProps {
    open: boolean;
    setOpen?: (value: boolean) => void;
    onVerify: (token: string) => void;
    onExpire?: () => void;
}
const RecaptchaComponent = ({ onVerify, open, onExpire, setOpen }: IProps) => {
    const recaptcha = useRef<RecaptchaRef | null>(null);

    const BASE_URL   = process.env.BASE_URL;
    const RECAPCHA_SITE_KEY = process.env.RECAPCHA_SITE_KEY;

    useEffect(() => {
        if (open) {
            recaptcha.current?.open();
        }
    },[open])

    return (
        <View>
            {BASE_URL && RECAPCHA_SITE_KEY && <Recaptcha
                ref={recaptcha}
                siteKey={RECAPCHA_SITE_KEY}
                baseUrl={BASE_URL}
                onVerify={onVerify}
                onExpire={onExpire}
                size='normal'
                onClose={() => setOpen && setOpen(false)}
                modalProps={{style: {
                    paddingTop: 200
                }}}
            />}
        </View>
    );
};

export default RecaptchaComponent;
