import React from 'react';
import Card from '../../components/UI/Card'

const StatisticsItem = ({label, value, secondLabel}) => {
    return (
        <Card className={`p-5`}>
            <h3 className="text-lg font-[600] text-darkjeans pb-2 text-center">{label}</h3>
            <p className='text-2xl font-[800] text-center text-jeans'>{value}</p>
            <p className='text-sm font-[300] text-slate-500 text-center'>{secondLabel}</p>
        </Card>
    )
}

export default StatisticsItem;