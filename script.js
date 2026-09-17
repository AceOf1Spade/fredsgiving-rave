// =====================================================
// GOOGLE APPS SCRIPT API
// =====================================================

const TICKET_API =
    "https://script.google.com/macros/s/AKfycbwDpGGxsE8a-VVp0xFCg1mf5zmDHnj5RVdHTyNm5-YnzjeZJi2NP6rEjoHWYGVI2dhk/exec";



// =====================================================
// PAYMENT LINKS
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
// MOBILE MENU
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
    closeMenu &&
    mobileMenu
) {


    menuButton.addEventListener(
        "click",
        function () {

            mobileMenu
                .classList
                .add("active");


            document.body.style.overflow =
                "hidden";

        }
    );



    closeMenu.addEventListener(
        "click",
        function () {

            mobileMenu
                .classList
                .remove("active");


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
// GENERATE PAYMENT REFERENCE
//
// Example:
// FRED-PAY-7K4M2Q
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
// PAYMENT FORM
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



if (
    ticketForm &&
    ticketMessage
) {


    ticketForm.addEventListener(
        "submit",
        async function (event) {


            event.preventDefault();



            // =========================================
            // GET FORM INFORMATION
            // =========================================

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



            if (
                !email ||
                !paymentMethod ||
                !paymentName
            ) {


                ticketMessage.textContent =
                    "Please complete all fields.";


                return;

            }



            // =========================================
            // CREATE PAYMENT CODE
            // =========================================

            const paymentReference =
                createPaymentReference();



            createCodeButton.disabled =
                true;


            createCodeButton.textContent =
                "CREATING CODE...";


            ticketMessage.textContent =
                "Creating your payment request...";



            // =========================================
            // SEND REQUEST TO GOOGLE SHEET
            // =========================================

            try {


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



                // =====================================
                // SHOW PAYMENT REFERENCE
                // =====================================

                paymentReferenceText.textContent =
                    paymentReference;


                paymentReferenceBox
                    .classList
                    .remove(
                        "hidden"
                    );



                // =====================================
                // SET PAYMENT BUTTON
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
                // LOCK FORM
                // Prevent accidental duplicate request
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



                // Scroll to code

                paymentReferenceBox
                    .scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "center"

                    });


            } catch (error) {


                console.error(
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
// COPY PAYMENT REFERENCE
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