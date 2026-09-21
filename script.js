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
// ♠ TICKET SETTINGS
// =====================================================

const TICKET_PRICE =
  5;


const MAX_ORDER_QUANTITY =
  10;



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
// ♠ NEW CAPACITY ELEMENTS
//
// These will be added in payment.html next.
//
// If they do not exist yet, the script
// still works safely.
// =====================================================

const capacityBox =
  document.getElementById(
    "capacityBox"
  );


const capacityText =
  document.getElementById(
    "capacityText"
  );


const capacityRemaining =
  document.getElementById(
    "capacityRemaining"
  );


const soldOutBox =
  document.getElementById(
    "soldOutBox"
  );



// =====================================================
// ♠ CAPACITY STATE
// =====================================================

let liveCapacity = {

  capacity:
    170,

  reserved:
    0,

  remaining:
    170,

  soldOut:
    false

};



// =====================================================
// ♠ GET QUANTITY
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



// =====================================================
// ♠ ORDER TOTAL
// =====================================================

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



// =====================================================
// ♠ BUILD QUANTITY OPTIONS
//
// Quantity is limited to:
//
// 1. Maximum order size = 10
// 2. Remaining event capacity
// =====================================================

function rebuildQuantityOptions() {

  if (!ticketQuantity) {

    return;

  }



  const previousQuantity =
    getQuantity();



  const maximumAllowed =
    Math.min(

      MAX_ORDER_QUANTITY,

      Math.max(
        0,
        liveCapacity.remaining
      )

    );



  ticketQuantity.innerHTML =
    "";



  // =================================================
  // Sold out
  // =================================================

  if (
    maximumAllowed <= 0
  ) {

    const option =
      document.createElement(
        "option"
      );


    option.value =
      "";


    option.textContent =
      "Sold Out";


    ticketQuantity.appendChild(
      option
    );


    ticketQuantity.disabled =
      true;


    updateOrderTotal();


    return;

  }



  // =================================================
  // Add available quantities
  // =================================================

  for (
    let i = 1;
    i <= maximumAllowed;
    i++
  ) {


    const option =
      document.createElement(
        "option"
      );


    option.value =
      String(
        i
      );


    option.textContent =

      i +

      (
        i === 1
          ? " Ticket"
          : " Tickets"
      );


    ticketQuantity.appendChild(
      option
    );

  }



  // =================================================
  // Preserve current selection when possible
  // =================================================

  const safeQuantity =
    Math.min(
      previousQuantity,
      maximumAllowed
    );


  ticketQuantity.value =
    String(
      safeQuantity
    );


  ticketQuantity.disabled =
    false;


  updateOrderTotal();

}



// =====================================================
// ♠ SOLD OUT MODE
// =====================================================

function activateSoldOutMode() {


  liveCapacity.soldOut =
    true;


  liveCapacity.remaining =
    0;



  if (ticketForm) {

    ticketForm.classList.add(
      "sold-out-form"
    );

  }



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

    createCodeButton.disabled =
      true;


    createCodeButton.textContent =
      "SOLD OUT";

  }



  if (capacityText) {

    capacityText.textContent =
      "Fredsgiving Rave has reached maximum capacity.";

  }



  if (capacityRemaining) {

    capacityRemaining.textContent =
      "0";

  }



  if (soldOutBox) {

    soldOutBox.classList.remove(
      "hidden"
    );

  }



  if (ticketMessage) {

    ticketMessage.textContent =
      "Ticket sales are currently closed because the event has reached capacity.";

  }



  rebuildQuantityOptions();

}



// =====================================================
// ♠ ACTIVE SALES MODE
// =====================================================

function activateSalesMode() {


  if (ticketForm) {

    ticketForm.classList.remove(
      "sold-out-form"
    );

  }



  if (ticketEmail) {

    ticketEmail.disabled =
      false;

  }


  if (ticketQuantity) {

    ticketQuantity.disabled =
      false;

  }


  if (paymentMethod) {

    paymentMethod.disabled =
      false;

  }


  if (paymentName) {

    paymentName.disabled =
      false;

  }


  if (createCodeButton) {

    createCodeButton.disabled =
      false;


    createCodeButton.textContent =
      "CREATE PAYMENT CODE";

  }



  if (soldOutBox) {

    soldOutBox.classList.add(
      "hidden"
    );

  }



  rebuildQuantityOptions();

}



// =====================================================
// ♠ CAPACITY CALLBACK
//
// Google Apps Script calls this through JSONP.
// =====================================================

function fredsgivingCapacityCallback(
  data
) {


  if (!data) {

    return;

  }



  liveCapacity = {

    capacity:
      Number(
        data.capacity
      ) || 170,

    reserved:
      Number(
        data.reserved
      ) || 0,

    remaining:
      Number(
        data.remaining
      ) || 0,

    soldOut:
      Boolean(
        data.soldOut
      )

  };



  console.log(
    "♠ Fredsgiving capacity:",
    liveCapacity
  );



  if (capacityRemaining) {

    capacityRemaining.textContent =
      liveCapacity.remaining;

  }



  if (capacityText) {


    if (
      liveCapacity.soldOut
    ) {

      capacityText.textContent =
        "SOLD OUT";

    } else {


      capacityText.textContent =

        liveCapacity.remaining +

        (
          liveCapacity.remaining === 1
            ? " spot remaining"
            : " spots remaining"
        );

    }

  }



  if (
    liveCapacity.soldOut ||
    liveCapacity.remaining <= 0
  ) {

    activateSoldOutMode();

  } else {

    activateSalesMode();

  }

}



// =====================================================
// ♠ LOAD LIVE CAPACITY
//
// Uses JSONP because the site is hosted
// on GitHub Pages and Apps Script is
// on another domain.
// =====================================================

function loadCapacity() {


  // =================================================
  // Remove old JSONP script if one exists
  // =================================================

  const oldScript =
    document.getElementById(
      "fredsgivingCapacityScript"
    );


  if (oldScript) {

    oldScript.remove();

  }



  const script =
    document.createElement(
      "script"
    );


  script.id =
    "fredsgivingCapacityScript";



  script.src =

    TICKET_API +

    "?action=capacity" +

    "&callback=fredsgivingCapacityCallback" +

    "&t=" +

    Date.now();



  script.onerror =
    function () {


      console.error(
        "♠ Could not load live capacity."
      );


      if (capacityText) {

        capacityText.textContent =
          "Capacity status unavailable";

      }

    };



  document.body.appendChild(
    script
  );

}



// =====================================================
// ♠ QUANTITY CHANGE
// =====================================================

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
      // Block if sold out
      // =================================================

      if (
        liveCapacity.soldOut ||
        liveCapacity.remaining <= 0
      ) {

        activateSoldOutMode();


        return;

      }



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
      // Validate fields
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



      // =================================================
      // Validate against live remaining capacity
      // =================================================

      if (
        quantity >
        liveCapacity.remaining
      ) {

        if (ticketMessage) {

          ticketMessage.textContent =

            "Only " +
            liveCapacity.remaining +
            " ticket spot(s) remain.";

        }


        loadCapacity();


        return;

      }



      if (
        quantity < 1 ||
        quantity >
        MAX_ORDER_QUANTITY
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
      // Create payment reference
      // =================================================

      const reference =
        createPaymentReference();



      const total =
        quantity *
        TICKET_PRICE;



      // =================================================
      // Disable button while saving
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
        // Send order
        //
        // NOTE:
        // no-cors means the browser cannot inspect
        // the Apps Script response.
        //
        // Backend capacity enforcement remains
        // the final authority.
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
        // Briefly refresh capacity after submission
        // =================================================

        setTimeout(
          loadCapacity,
          1200
        );



        // =================================================
        // Display payment information
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
        // Lock the order form
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
        // Scroll to code
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
// ♠ INITIAL CAPACITY CHECK
// =====================================================

if (ticketForm) {

  loadCapacity();

}



// =====================================================
// ♠ OPTIONAL CAPACITY REFRESH
//
// Refresh every 60 seconds while someone
// is sitting on the payment page.
// =====================================================

if (ticketForm) {

  setInterval(
    loadCapacity,
    60000
  );

}



// =====================================================
//
//                ♠ END OF DJ SPADE JS ♠
//
// =====================================================