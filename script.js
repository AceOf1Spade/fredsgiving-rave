// =====================================================
//
//                     ♠ DJ SPADE ♠
//
//                 FREDSGIVING RAVE
//
//                    WEBSITE JS
//
//              Built by Gerardo Camacho
//
// =====================================================


console.log(
  "♠ FREDSGIVING RAVE ♠ Website by Gerardo Camacho / DJ Spade"
);



// =====================================================
// ♠ TICKET BACKEND
// =====================================================

const TICKET_API =
  "https://script.google.com/macros/s/AKfycby8XSX7NDmj5cqp88KdISQqV7T4mLAvdcIub3oYyNeV-VFRtq5oIysVGBjePofnwvMd/exec";



// =====================================================
// ♠ PAYMENT LINKS
// =====================================================

const PAYMENT_LINKS = {

  "PayPal":
    "https://www.paypal.me/electrokipper",

  "Venmo":
    "https://www.venmo.com/kidpizza",

  "Cash App":
    "https://cash.app/$kidpizza"

};



// =====================================================
// ♠ TICKET PRICE
// =====================================================

const TICKET_PRICE = 5;



// =====================================================
// ♠ MOBILE MENU
// =====================================================

const menuButton =
  document.getElementById(
    "menuButton"
  );


const closeMenu =
  document.getElementById(
    "closeMenu"
  );


const mobileMenu =
  document.getElementById(
    "mobileMenu"
  );



if (
  menuButton &&
  mobileMenu
) {

  menuButton.addEventListener(
    "click",
    function () {

      mobileMenu.classList.add(
        "active"
      );

    }
  );

}



if (
  closeMenu &&
  mobileMenu
) {

  closeMenu.addEventListener(
    "click",
    function () {

      mobileMenu.classList.remove(
        "active"
      );

    }
  );

}



if (mobileMenu) {

  const mobileLinks =
    mobileMenu.querySelectorAll(
      "a"
    );


  mobileLinks.forEach(
    function (link) {

      link.addEventListener(
        "click",
        function () {

          mobileMenu.classList.remove(
            "active"
          );

        }
      );

    }
  );

}



// =====================================================
// ♠ PAYMENT REFERENCE GENERATOR
//
// Example:
//
// FRED-PAY-ABC123
// =====================================================

function createPaymentReference() {

  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


  let code =
    "";


  for (
    let i = 0;
    i < 6;
    i++
  ) {

    code +=
      characters.charAt(

        Math.floor(

          Math.random() *
          characters.length

        )

      );

  }


  return "FRED-PAY-" + code;

}



// =====================================================
// ♠ PAYMENT PAGE ELEMENTS
// =====================================================

const ticketForm =
  document.getElementById(
    "ticketForm"
  );


const ticketMessage =
  document.getElementById(
    "ticketMessage"
  );


const paymentReferenceBox =
  document.getElementById(
    "paymentReferenceBox"
  );


const paymentReference =
  document.getElementById(
    "paymentReference"
  );


const selectedPaymentButton =
  document.getElementById(
    "selectedPaymentButton"
  );


const createCodeButton =
  document.getElementById(
    "createCodeButton"
  );


const ticketEmail =
  document.getElementById(
    "ticketEmail"
  );


const ticketQuantity =
  document.getElementById(
    "ticketQuantity"
  );


const paymentMethod =
  document.getElementById(
    "paymentMethod"
  );


const paymentName =
  document.getElementById(
    "paymentName"
  );


const copyReferenceButton =
  document.getElementById(
    "copyReferenceButton"
  );


const orderTotal =
  document.getElementById(
    "orderTotal"
  );


const orderTotalDetail =
  document.getElementById(
    "orderTotalDetail"
  );


const finalTicketQuantity =
  document.getElementById(
    "finalTicketQuantity"
  );


const finalOrderTotal =
  document.getElementById(
    "finalOrderTotal"
  );


const paymentAmountMessage =
  document.getElementById(
    "paymentAmountMessage"
  );



// =====================================================
// ♠ ORDER TOTAL
// =====================================================

function getQuantity() {

  if (!ticketQuantity) {

    return 1;

  }


  const quantity =
    parseInt(
      ticketQuantity.value,
      10
    );


  if (
    Number.isNaN(quantity) ||
    quantity < 1
  ) {

    return 1;

  }


  return quantity;

}



function getOrderTotal() {

  return (
    getQuantity() *
    TICKET_PRICE
  );

}



// =====================================================
// ♠ UPDATE LIVE ORDER TOTAL
// =====================================================

function updateOrderTotal() {

  if (!ticketQuantity) {

    return;

  }


  const quantity =
    getQuantity();


  const total =
    getOrderTotal();


  if (orderTotal) {

    orderTotal.textContent =
      "$" + total;

  }


  if (orderTotalDetail) {

    orderTotalDetail.textContent =

      quantity +

      (
        quantity === 1
          ? " ticket × $5"
          : " tickets × $5"
      );

  }

}



if (ticketQuantity) {

  ticketQuantity.addEventListener(
    "change",
    updateOrderTotal
  );


  updateOrderTotal();

}



// =====================================================
// ♠ SUBMIT TICKET ORDER
// =====================================================

if (ticketForm) {

  ticketForm.addEventListener(
    "submit",
    async function (event) {


      event.preventDefault();



      // =================================================
      // Read form values
      // =================================================

      const email =
        ticketEmail
          ? ticketEmail.value.trim()
          : "";


      const quantity =
        getQuantity();


      const method =
        paymentMethod
          ? paymentMethod.value.trim()
          : "";


      const name =
        paymentName
          ? paymentName.value.trim()
          : "";



      // =================================================
      // Validate
      // =================================================

      if (
        !email ||
        !method ||
        !name
      ) {

        if (ticketMessage) {

          ticketMessage.textContent =
            "Please complete all required fields.";

        }


        return;

      }



      if (
        quantity < 1 ||
        quantity > 10
      ) {

        if (ticketMessage) {

          ticketMessage.textContent =
            "Please choose between 1 and 10 tickets.";

        }


        return;

      }



      if (
        !PAYMENT_LINKS[
          method
        ]
      ) {

        if (ticketMessage) {

          ticketMessage.textContent =
            "Please select a valid payment method.";

        }


        return;

      }



      // =================================================
      // Create one payment reference for whole order
      // =================================================

      const reference =
        createPaymentReference();



      const total =
        quantity *
        TICKET_PRICE;



      // =================================================
      // Disable submit button while saving
      // =================================================

      if (createCodeButton) {

        createCodeButton.disabled =
          true;


        createCodeButton.textContent =
          "CREATING CODE...";

      }



      if (ticketMessage) {

        ticketMessage.textContent =
          "Creating your payment code...";

      }



      try {


        // =================================================
        // Send order to Apps Script
        // =================================================

        await fetch(
          TICKET_API,
          {

            method:
              "POST",

            mode:
              "no-cors",

            headers: {

              "Content-Type":
                "text/plain;charset=utf-8"

            },

            body:
              JSON.stringify({

                email:
                  email,

                paymentMethod:
                  method,

                paymentName:
                  name,

                paymentReference:
                  reference,

                ticketQuantity:
                  quantity

              })

          }
        );



        // =================================================
        // Show reference code
        // =================================================

        if (paymentReference) {

          paymentReference.textContent =
            reference;

        }



        if (finalTicketQuantity) {

          finalTicketQuantity.textContent =
            quantity;

        }



        if (finalOrderTotal) {

          finalOrderTotal.textContent =
            "$" + total;

        }



        if (paymentAmountMessage) {

          paymentAmountMessage.textContent =

            "Now send your $" +
            total +
            " payment:";

        }



        if (selectedPaymentButton) {

          selectedPaymentButton.href =
            PAYMENT_LINKS[
              method
            ];


          selectedPaymentButton.textContent =

            "PAY $" +
            total +
            " WITH " +
            method.toUpperCase();

        }



        if (paymentReferenceBox) {

          paymentReferenceBox.classList.remove(
            "hidden"
          );

        }



        if (ticketMessage) {

          ticketMessage.textContent =
            "Payment code created. Copy it before paying.";

        }



        // =================================================
        // Lock form after order is created
        // =================================================

        if (ticketEmail) {

          ticketEmail.disabled =
            true;

        }


        if (ticketQuantity) {

          ticketQuantity.disabled =
            true;

        }


        if (paymentMethod) {

          paymentMethod.disabled =
            true;

        }


        if (paymentName) {

          paymentName.disabled =
            true;

        }


        if (createCodeButton) {

          createCodeButton.style.display =
            "none";

        }



        // =================================================
        // Scroll to payment code
        // =================================================

        if (paymentReferenceBox) {

          paymentReferenceBox.scrollIntoView(
            {

              behavior:
                "smooth",

              block:
                "center"

            }
          );

        }


      } catch (error) {


        console.error(
          "♠ Ticket request error:",
          error
        );


        if (ticketMessage) {

          ticketMessage.textContent =
            "There was a problem creating your payment code. Please try again.";

        }



        if (createCodeButton) {

          createCodeButton.disabled =
            false;


          createCodeButton.textContent =
            "CREATE PAYMENT CODE";

        }

      }

    }
  );

}



// =====================================================
// ♠ COPY PAYMENT REFERENCE
// =====================================================

if (
  copyReferenceButton &&
  paymentReference
) {

  copyReferenceButton.addEventListener(
    "click",
    async function () {


      const code =
        paymentReference.textContent.trim();



      try {


        await navigator.clipboard.writeText(
          code
        );


        const originalText =
          copyReferenceButton.textContent;


        copyReferenceButton.textContent =
          "COPIED ✓";


        setTimeout(
          function () {

            copyReferenceButton.textContent =
              originalText;

          },
          1800
        );


      } catch (error) {


        console.error(
          "♠ Clipboard error:",
          error
        );


        alert(
          "Copy this payment code:\n\n" +
          code
        );

      }

    }
  );

}



// =====================================================
//
//                ♠ END OF DJ SPADE JS ♠
//
// =====================================================