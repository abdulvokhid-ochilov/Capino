'use strict';
const inpTable = document.querySelector('.inp-bottom-table tbody');
const plusInp = document.querySelector('.inp-plus-btn');
const outTable = document.querySelector('.out-bottom-table tbody');
const plusOut = document.querySelector('.out-plus-btn');

const inpTableRow = `<tr>
                        <td>
                            <input type="text" name="화물명">
                        </td>
                        <td>
                            <input type="text" name="포장규격">
                        </td>
                        <td>
                            <input type="text" name="수량(개)">
                        </td>
                        <td>
                            <input type="text" name="용적(CBM)">
                        </td>
                        <td>
                            <input type="text" name="중량(Kg)">
                        </td>
                     </tr>`;
const outTableRow = `<tr>
                        <td>
                            <input type="text" name="화주명">
                        </td>
                        <td>
                            <input type="text" name="비엘">
                        </td>
                        <td>
                            <input type="text" name="출고수량">
                        </td>
                    </tr>`;
if (!plusOut) {
    plusInp.addEventListener('click', function () {
        inpTable.insertAdjacentHTML('beforeend', inpTableRow);
    });
} else {
    plusOut.addEventListener('click', function () {
        outTable.insertAdjacentHTML('beforeend', outTableRow);
    });
}
