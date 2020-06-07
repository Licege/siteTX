import React from 'react'
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

interface IProps {
    to: string
    label: String
}

const LinkButton: React.FC<IProps> = ({to, label}) => (
    <div className='Link-Button'>
        <Link to={to}>
            <Button variant="outlined">
                {label}
            </Button>
        </Link>
    </div>
)

export default LinkButton;