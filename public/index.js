"use strict";
const inpTable = document.querySelector(".inp-bottom-table tbody");
const plusInp = document.querySelector(".inp-plus-btn");
const outTable = document.querySelector(".out-bottom-table tbody");
const minusInp = document.querySelector(".inp-minus-btn");
const minusOut = document.querySelector(".out-minus-btn");
const plusOut = document.querySelector(".out-plus-btn");
const outputLink = document.querySelector(".output-link");
const inputLink = document.querySelector(".input-link");
const outputdbLink = document.querySelector(".outputdb-link");
const inputdbLink = document.querySelector(".inputdb-link");
const guideLink = document.querySelector(".guide-link");
const navLink = document.querySelectorAll(".nav-link");
const h1 = document.querySelector(".page-heading").textContent;
const printBtn = document.querySelector(".pritn-btn");

if (printBtn) {
  const printArea = document.querySelector(".print-cont").innerHTML;
  const originalContents = document.body.innerHTML;

  // print button functionality
  printBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.innerHTML = printArea;

    window.print();

    document.body.innerHTML = originalContents;
  });
}

//navigation bar active function
const active = function (heading) {
  navLink.forEach((el) => {
    el.classList.remove("blue-active");
    el.classList.remove("red-active");
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
    outputLink.classList.add("red-active");
  } else if (h1 === "QR사용법") {
    // outputLink.classList.add("active");
    guideLink.classList.add("red-active");
  }
};
active(h1);
//add table row functionality

const inpTableRow = `<tr>
                        <td class="td-width">
                            <input type="text" name="화주명">
                        </td>
                        <td class="td-width">
                            <select name="포장규격" class="select">
                                <option value="BOX">BOX</option>
                                <option value="PALLET">PALLET</option>
                                <option value="FABRIC">FABRIC</option>
                            </select>
                        </td>
                        <td class="td-width">
                            <input type="text" name="입고수량">
                        </td>
                        <td class="td-width">
                            <input type="text" name="중량">
                        </td>
                        <td class="td-width">
                            <input type="text" name="용적">
                        </td>
                    </tr>`;
const outTableRow = `<tr>
                        <td>
                            <input type="text" name="bl_number" />
                        </td>
                        <td>
                            <input type="text" name="client" />
                        </td>
                        <td>
                            <input type="text" name="total_quantity" />
                        </td>
                        <td>
                            <input type="text" name="quantity" />
                        </td>
                        </tr>
                    <tr>`;

// Add button

if (plusInp) {
  plusInp.addEventListener("click", function () {
    inpTable.insertAdjacentHTML("beforeend", inpTableRow);
  });
} else if (plusOut) {
  plusOut.addEventListener("click", function () {
    outTable.insertAdjacentHTML("beforeend", outTableRow);
  });
}

// remove button

if (minusInp) {
  minusInp.addEventListener("click", function () {
    const inpTableTr = document.querySelectorAll(".inp-bottom-table tbody tr");
    if (inpTableTr.length > 3) {
      console.log(inpTable.lastElementChild);
      const lastTr = inpTable.lastElementChild;
      inpTable.removeChild(lastTr);
    }
  });
} else if (minusOut) {
  minusOut.addEventListener("click", function () {
    const outTableTr = document.querySelectorAll(".out-bottom-table tbody tr");
    if (outTableTr.length > 3) {
      const lastTr = outTable.lastChild;

      outTable.removeChild(lastTr);
    }
  });
}
