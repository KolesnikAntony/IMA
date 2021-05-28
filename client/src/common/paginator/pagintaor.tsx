import React, {FC, useState} from 'react'
import './paginator.scss'


interface PropsType {
    totalPages: number
    portionSize: number
    currentPage: number
    showCurrentProducts: (currentPage: number) => void
}

const Paginator:FC<PropsType> = ({totalPages, portionSize, currentPage, showCurrentProducts}) => {

    let pages = [];

    for(let i = 1; i <= totalPages; i++){
        pages.push(i);
    }

    let portionCount = Math.ceil(totalPages/ portionSize );
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1 ) * portionSize + 1;
    let rightPortionPageNumber =  portionSize * portionNumber;

    const portionFlow = (portionCurrentNumber: number,currentPageOfPortion: number) => {
        setPortionNumber(portionCurrentNumber);
        showCurrentProducts(currentPageOfPortion);
    };

    const nextPortion = (portionNumber: number, portionSize: number) => {
        let portionCurrentNumber = portionNumber + 1;
        let currentPageOfPortion = (portionCurrentNumber - 1) * portionSize+ + 1;
        portionFlow(portionCurrentNumber, currentPageOfPortion)

    };

    const prevPortion = (portionNumber: number, portionSize: number) => {
        let portionCurrentNumber = portionNumber - 1;
        let currentPageOfPortion = portionCurrentNumber * portionSize;
        portionFlow(portionCurrentNumber, currentPageOfPortion);
    };

    return <div className='paginator'>
        <button onClick={() => prevPortion(portionNumber,portionSize)} className={portionNumber <= 1 ? 'paginator__btn  paginator__btn--prev hide' : 'paginator__btn paginator__btn--prev'}/>
        <div className="paginator__wrap">
            {pages.length > 1 && pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(el=> <span key={el} className={el == currentPage ? 'paginator__number active' : 'paginator__number'}
                                onClick={()=> showCurrentProducts(el)}>{el}</span>)}
        </div>
        <button onClick={() => nextPortion(portionNumber,portionSize)} className={portionCount <= portionNumber  ? 'paginator__btn paginator__btn--next hide' : 'paginator__btn paginator__btn--next'}/>
    </div>
};

export default Paginator;