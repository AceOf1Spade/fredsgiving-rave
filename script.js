// =====================================================
// ♠ DJ SPADE
// FREDSGIVING RAVE
// Website + Ticket Frontend
// Built by Gerardo Camacho
// =====================================================

console.log(`
♠ FREDSGIVING RAVE ♠
Website by Gerardo Camacho / DJ Spade
`);



// =====================================================
// ♠ NEW GOOGLE APPS SCRIPT BACKEND
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
// ♠ MOBILE MENU
// =====================================================

const menuButton =
    document.getElementById("menuButton");

const closeMenu =
    document.getElementById("closeMenu");

const mobileMenu =
    document.getElementById("mobileMenu");


if (
    menuButton &&
    closeMenu &&
    mobileMenu
) {

    menuButton.addEventListener(
        "click",
        function () {

            mobileMenu.classList.add("active");

            document.body.style.overflow =
                "hidden";

        }
    );


    closeMenu.addEventListener(
        "click",
        function () {

            mobileMenu.classList.remove("active");

            document.body.style.overflow =
                "";

        }
    );


    document
        .querySelectorAll(
            ".mobile-menu-links a"
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        mobileMenu
                            .classList
                            .remove("active");

                        document.body.style.overflow =
                            "";

                    }
                );

            }
        );

}



// =====================================================
// ♠ PAYMENT CODE GENERATOR
// =====================================================

function createPaymentReference() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                characters.length
            );

        code +=
            characters.charAt(
                randomIndex
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

const paymentReferenceText =
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



// =====================================================
// ♠ SUBMIT TICKET REQUEST
// =====================================================

if (ticketForm) {

    ticketForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // -----------------------------------------
            // Get buyer information
            // -----------------------------------------

            const email =
                document
                    .getElementById(
                        "ticketEmail"
                    )
                    .value
                    .trim();


            const paymentMethod =
                document
                    .getElementById(
                        "paymentMethod"
                    )
                    .value;


            const paymentName =
                document
                    .getElementById(
                        "paymentName"
                    )
                    .value
                    .trim();



            // -----------------------------------------
            // Validate fields
            // -----------------------------------------

            if (
                !email ||
                !paymentMethod ||
                !paymentName
            ) {

                ticketMessage.textContent =
                    "Please complete all fields.";

                return;

            }



            // -----------------------------------------
            // Generate payment reference
            // -----------------------------------------

            const paymentReference =
                createPaymentReference();



            createCodeButton.disabled =
                true;


            createCodeButton.textContent =
                "CREATING CODE...";


            ticketMessage.textContent =
                "Creating your payment request...";



            console.log(
                "♠ Sending ticket request:",
                {
                    email,
                    paymentMethod,
                    paymentName,
                    paymentReference
                }
            );



            try {


                // =====================================
                // ♠ SEND TO APPS SCRIPT
                //
                // This matches the browser test
                // that successfully wrote to Sheets.
                // =====================================

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
                                    paymentMethod,

                                paymentName:
                                    paymentName,

                                paymentReference:
                                    paymentReference

                            })

                    }
                );



                console.log(
                    "♠ POST request completed:",
                    paymentReference
                );



                // =====================================
                // Show customer's payment code
                // =====================================

                paymentReferenceText.textContent =
                    paymentReference;


                paymentReferenceBox
                    .classList
                    .remove("hidden");



                // =====================================
                // Payment app button
                // =====================================

                selectedPaymentButton.href =
                    PAYMENT_LINKS[
                        paymentMethod
                    ];


                selectedPaymentButton.textContent =
                    "PAY WITH " +
                    paymentMethod.toUpperCase();



                ticketMessage.textContent =
                    "Payment code created. Copy it before paying.";



                // =====================================
                // Lock the information so the customer
                // can't accidentally create duplicates.
                // =====================================

                ticketForm
                    .querySelectorAll(
                        "input, select"
                    )
                    .forEach(
                        function (field) {

                            field.disabled =
                                true;

                        }
                    );


                createCodeButton.style.display =
                    "none";



                // =====================================
                // Scroll to payment code
                // =====================================

                paymentReferenceBox
                    .scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "center"

                    });


            } catch (error) {


                console.error(
                    "♠ Ticket request failed:",
                    error
                );


                ticketMessage.textContent =
                    "Something went wrong. Please try again.";


                createCodeButton.disabled =
                    false;


                createCodeButton.textContent =
                    "CREATE PAYMENT CODE";

            }

        }
    );

}



// =====================================================
// ♠ COPY PAYMENT CODE
// =====================================================

const copyReferenceButton =
    document.getElementById(
        "copyReferenceButton"
    );


if (
    copyReferenceButton &&
    paymentReferenceText
) {

    copyReferenceButton.addEventListener(
        "click",
        async function () {


            const code =
                paymentReferenceText
                    .textContent
                    .trim();


            try {


                await navigator
                    .clipboard
                    .writeText(
                        code
                    );


                copyReferenceButton.textContent =
                    "COPIED ✓";


                setTimeout(
                    function () {

                        copyReferenceButton.textContent =
                            "COPY CODE";

                    },
                    2000
                );


            } catch (error) {


                console.error(
                    "♠ Copy failed:",
                    error
                );


                alert(
                    "Your payment code is: " +
                    code
                );

            }

        }
    );

}



// =====================================================
// ♠ END OF DJ SPADE FRONTEND
// =====================================================