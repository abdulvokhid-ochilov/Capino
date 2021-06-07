'use strict';
const inpTable = document.querySelector('.inp-bottom-table tbody');
const plusInp = document.querySelector('.inp-plus-btn');
const outTable = document.querySelector('.out-bottom-table tbody');
const plusOut = document.querySelector('.out-plus-btn');
const outputLink = document.querySelector(".output-link");
const inputLink = document.querySelector('.input-link');
const outputdbLink = document.querySelector('.outputdb-link');
const inputdbLink = document.querySelector('.inputdb-link');
const navLink = document.querySelectorAll('.nav-link');
const h1 = document.querySelector('.page-heading').textContent;
const printBtn = document.querySelector('.pritn-btn');

if (printBtn) {
    const printArea = document.querySelector('.print-cont').innerHTML;
    const originalContents = document.body.innerHTML;

    // print button functionality
    printBtn.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.innerHTML = printArea;

        window.print();

        document.body.innerHTML = originalContents;
    });

}




//navigation bar active function 
const active = function (heading) {
    navLink.forEach((el) => {
        el.classList.remove('blue-active');
        el.classList.remove('red-active');
    });
    if (h1 === "입고 조회") {
        // inputdbLink.classList.add('active');
        inputdbLink.classList.add("blue-active");
    } else if (h1 === "출고 조회") {
        // outputdbLink.classList.add('active');
        outputdbLink.classList.add("red-active");
    } else if (h1 === "입고 요청서") {
        // inputLink.classList.add("active");
        inputLink.classList.add("blue-active");
    } else if (h1 === "출고 요청서") {
        // outputLink.classList.add("active");
        outputLink.classList.add('red-active');
    }
};
active(h1);
//add table row functionality 
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
if (plusInp || plusOut) {
    if (!plusOut) {
        plusInp.addEventListener('click', function () {
            inpTable.insertAdjacentHTML('beforeend', inpTableRow);
        });
    } else {
        plusOut.addEventListener('click', function () {
            outTable.insertAdjacentHTML('beforeend', outTableRow);
        });
    }

}
