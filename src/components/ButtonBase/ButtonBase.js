import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonBase = ({ value, onClick, className }) => {
    return <Button className={className} onClick={onClick.bind(this,value)}>{value}</Button>
}
export default ButtonBase;