// =====================================================
//
//                     ♠ DJ SPADE ♠
//
//                  FREDSGIVING RAVE
//
//                 FREE RSVP WEBSITE
//
//              Courtland Entertainment
//
//              Built by Gerardo Camacho
//
// =====================================================



console.log(
    "♠ FREDSGIVING RAVE ♠"
);



// =====================================================
// ♠ BACKEND
// =====================================================

const TICKET_API =
    "https://script.google.com/macros/s/AKfycby8XSX7NDmj5cqp88KdISQqV7T4mLAvdcIub3oYyNeV-VFRtq5oIysVGBjePofnwvMd/exec";



// =====================================================
// ♠ EVENT SETTINGS
// =====================================================

const EVENT_CAPACITY =
    170;



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
// ♠ RSVP ELEMENTS
// =====================================================

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );


const rsvpName =
    document.getElementById(
        "rsvpName"
    );


const rsvpEmail =
    document.getElementById(
        "rsvpEmail"
    );


const rsvpButton =
    document.getElementById(
        "rsvpButton"
    );


const rsvpMessage =
    document.getElementById(
        "rsvpMessage"
    );


const rsvpSuccess =
    document.getElementById(
        "rsvpSuccess"
    );


const successName =
    document.getElementById(
        "successName"
    );


const capacityText =
    document.getElementById(
        "capacityText"
    );


const capacityRemaining =
    document.getElementById(
        "capacityRemaining"
    );


const capacityProgress =
    document.getElementById(
        "capacityProgress"
    );


const soldOutBox =
    document.getElementById(
        "soldOutBox"
    );


const rsvpAvailability =
    document.getElementById(
        "rsvpAvailability"
    );



// =====================================================
// ♠ LIVE CAPACITY STATE
// =====================================================

let liveCapacity = {

    capacity:
        EVENT_CAPACITY,

    rsvps:
        0,

    remaining:
        EVENT_CAPACITY,

    soldOut:
        false

};



let capacityLoaded =
    false;


let rsvpSubmitting =
    false;



// =====================================================
// ♠ SET RSVP MESSAGE
// =====================================================

function setRSVPMessage(
    message,
    type
) {


    if (
        !rsvpMessage
    ) {

        return;

    }


    rsvpMessage.textContent =
        message || "";


    rsvpMessage.classList.remove(
        "success-message",
        "error-message"
    );


    if (
        type === "success"
    ) {

        rsvpMessage.classList.add(
            "success-message"
        );

    }


    if (
        type === "error"
    ) {

        rsvpMessage.classList.add(
            "error-message"
        );

    }

}



// =====================================================
// ♠ UPDATE CAPACITY DISPLAY
// =====================================================

function updateCapacityDisplay() {


    const capacity =
        Number(
            liveCapacity.capacity
        ) || EVENT_CAPACITY;


    const remaining =
        Math.max(
            0,
            Number(
                liveCapacity.remaining
            ) || 0
        );


    const rsvps =
        Math.max(
            0,
            Number(
                liveCapacity.rsvps
            ) || 0
        );


    const percentage =
        Math.min(
            100,
            Math.max(
                0,
                (
                    rsvps /
                    capacity
                ) * 100
            )
        );



    // =================================================
    // REMAINING COUNT
    // =================================================

    if (
        capacityRemaining
    ) {

        capacityRemaining.textContent =
            remaining;

    }



    // =================================================
    // CAPACITY TEXT
    // =================================================

    if (
        capacityText
    ) {


        if (
            liveCapacity.soldOut ||
            remaining <= 0
        ) {

            capacityText.textContent =
                "SOLD OUT";

        }

        else if (
            remaining === 1
        ) {

            capacityText.textContent =
                "1 RSVP spot remaining";

        }

        else {

            capacityText.textContent =
                remaining +
                " RSVP spots remaining";

        }

    }



    // =================================================
    // AVAILABILITY BADGE
    // =================================================

    if (
        rsvpAvailability
    ) {


        if (
            liveCapacity.soldOut ||
            remaining <= 0
        ) {

            rsvpAvailability.textContent =
                "RSVP CLOSED";


            rsvpAvailability.classList.add(
                "sold-out-status"
            );

        }

        else {

            rsvpAvailability.textContent =
                "RSVP AVAILABLE";


            rsvpAvailability.classList.remove(
                "sold-out-status"
            );

        }

    }



    // =================================================
    // PROGRESS BAR
    // =================================================

    if (
        capacityProgress
    ) {

        capacityProgress.style.width =
            percentage + "%";

    }



    // =================================================
    // SALES STATE
    // =================================================

    if (
        liveCapacity.soldOut ||
        remaining <= 0
    ) {

        activateSoldOutMode();

    }

    else {

        activateAvailableMode();

    }

}



// =====================================================
// ♠ SOLD OUT MODE
// =====================================================

function activateSoldOutMode() {


    liveCapacity.soldOut =
        true;


    liveCapacity.remaining =
        0;



    if (
        soldOutBox
    ) {

        soldOutBox.classList.remove(
            "hidden"
        );

    }



    if (
        rsvpForm
    ) {

        rsvpForm.classList.add(
            "rsvp-closed"
        );

    }



    if (
        rsvpName
    ) {

        rsvpName.disabled =
            true;

    }



    if (
        rsvpEmail
    ) {

        rsvpEmail.disabled =
            true;

    }



    if (
        rsvpButton
    ) {

        rsvpButton.disabled =
            true;


        rsvpButton.textContent =
            "RSVP CLOSED";

    }



    setRSVPMessage(

        "Fredsgiving Rave has reached the 170-person RSVP limit.",

        "error"

    );

}



// =====================================================
// ♠ AVAILABLE MODE
// =====================================================

function activateAvailableMode() {


    if (
        soldOutBox
    ) {

        soldOutBox.classList.add(
            "hidden"
        );

    }



    if (
        rsvpForm
    ) {

        rsvpForm.classList.remove(
            "rsvp-closed"
        );

    }



    if (
        !rsvpSubmitting
    ) {


        if (
            rsvpName
        ) {

            rsvpName.disabled =
                false;

        }



        if (
            rsvpEmail
        ) {

            rsvpEmail.disabled =
                false;

        }



        if (
            rsvpButton
        ) {

            rsvpButton.disabled =
                false;


            rsvpButton.textContent =
                "RESERVE MY SPOT";

        }

    }

}



// =====================================================
// ♠ CAPACITY CALLBACK
// =====================================================

function fredsgivingCapacityCallback(
    data
) {


    if (
        !data
    ) {

        return;

    }



    liveCapacity = {

        capacity:
            Number(
                data.capacity
            ) || EVENT_CAPACITY,

        rsvps:
            Number(
                data.rsvps
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



    capacityLoaded =
        true;



    console.log(
        "♠ Live RSVP capacity:",
        liveCapacity
    );



    updateCapacityDisplay();

}



// =====================================================
// ♠ LOAD LIVE CAPACITY
// =====================================================

function loadCapacity() {


    const previousScript =
        document.getElementById(
            "fredsgivingCapacityRequest"
        );


    if (
        previousScript
    ) {

        previousScript.remove();

    }



    const script =
        document.createElement(
            "script"
        );


    script.id =
        "fredsgivingCapacityRequest";


    script.src =

        TICKET_API +

        "?action=capacity" +

        "&callback=fredsgivingCapacityCallback" +

        "&t=" +

        Date.now();



    script.onerror =
        function () {


            console.error(
                "♠ Could not load RSVP capacity."
            );


            if (
                capacityText
            ) {

                capacityText.textContent =
                    "Availability temporarily unavailable";

            }


            if (
                rsvpAvailability
            ) {

                rsvpAvailability.textContent =
                    "CHECKING AVAILABILITY";

            }

        };



    document.body.appendChild(
        script
    );

}



// =====================================================
// ♠ RSVP CALLBACK
// =====================================================

function fredsgivingRSVPCallback(
    result
) {


    rsvpSubmitting =
        false;



    const requestScript =
        document.getElementById(
            "fredsgivingRSVPRequest"
        );


    if (
        requestScript
    ) {

        requestScript.remove();

    }



    if (
        !result
    ) {


        setRSVPMessage(

            "Something went wrong. Please try again.",

            "error"

        );


        activateAvailableMode();


        return;

    }



    // =================================================
    // SUCCESS
    // =================================================

    if (
        result.success
    ) {


        if (
            successName
        ) {

            successName.textContent =
                result.name || "guest";

        }



        if (
            rsvpSuccess
        ) {

            rsvpSuccess.classList.remove(
                "hidden"
            );

        }



        if (
            rsvpForm
        ) {

            rsvpForm.classList.add(
                "hidden"
            );

        }



        setRSVPMessage(

            "RSVP confirmed. Check your email for your QR ticket.",

            "success"

        );



        if (
            typeof result.remaining !==
            "undefined"
        ) {

            liveCapacity.remaining =
                Number(
                    result.remaining
                ) || 0;


            liveCapacity.rsvps =
                Math.max(
                    0,
                    EVENT_CAPACITY -
                    liveCapacity.remaining
                );


            liveCapacity.soldOut =
                liveCapacity.remaining <= 0;


            updateCapacityDisplay();

        }



        setTimeout(
            loadCapacity,
            1000
        );


        return;

    }



    // =================================================
    // DUPLICATE RSVP
    // =================================================

    if (
        result.duplicate
    ) {


        setRSVPMessage(

            result.message ||
            "An RSVP already exists for this email address.",

            "error"

        );


        activateAvailableMode();


        return;

    }



    // =================================================
    // SOLD OUT
    // =================================================

    if (
        result.soldOut
    ) {


        liveCapacity.soldOut =
            true;


        liveCapacity.remaining =
            0;


        updateCapacityDisplay();


        setRSVPMessage(

            result.message ||
            "Fredsgiving Rave is sold out.",

            "error"

        );


        return;

    }



    // =================================================
    // OTHER ERROR
    // =================================================

    setRSVPMessage(

        result.message ||
        "Unable to complete RSVP. Please try again.",

        "error"

    );


    activateAvailableMode();

}



// =====================================================
// ♠ SEND RSVP
//
// Uses JSONP because the website is on
// GitHub Pages and Apps Script is hosted
// on Google's domain.
// =====================================================

function submitRSVP(
    name,
    email
) {


    const previousRequest =
        document.getElementById(
            "fredsgivingRSVPRequest"
        );


    if (
        previousRequest
    ) {

        previousRequest.remove();

    }



    const script =
        document.createElement(
            "script"
        );


    script.id =
        "fredsgivingRSVPRequest";



    script.src =

        TICKET_API +

        "?action=rsvp" +

        "&name=" +
        encodeURIComponent(
            name
        ) +

        "&email=" +
        encodeURIComponent(
            email
        ) +

        "&callback=fredsgivingRSVPCallback" +

        "&t=" +
        Date.now();



    script.onerror =
        function () {


            rsvpSubmitting =
                false;


            setRSVPMessage(

                "Unable to connect to the RSVP system. Please try again.",

                "error"

            );


            activateAvailableMode();

        };



    document.body.appendChild(
        script
    );

}



// =====================================================
// ♠ RSVP FORM SUBMIT
// =====================================================

if (
    rsvpForm
) {

    rsvpForm.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();



            // =================================================
            // BLOCK DOUBLE SUBMISSION
            // =================================================

            if (
                rsvpSubmitting
            ) {

                return;

            }



            // =================================================
            // CHECK SOLD OUT
            // =================================================

            if (
                liveCapacity.soldOut ||
                liveCapacity.remaining <= 0
            ) {


                activateSoldOutMode();


                return;

            }



            // =================================================
            // VALUES
            // =================================================

            const name =
                rsvpName
                    ? rsvpName.value.trim()
                    : "";


            const email =
                rsvpEmail
                    ? rsvpEmail.value.trim()
                    : "";



            // =================================================
            // VALIDATION
            // =================================================

            if (
                !name
            ) {


                setRSVPMessage(

                    "Please enter your full name.",

                    "error"

                );


                if (
                    rsvpName
                ) {

                    rsvpName.focus();

                }


                return;

            }



            if (
                !email
            ) {


                setRSVPMessage(

                    "Please enter your email address.",

                    "error"

                );


                if (
                    rsvpEmail
                ) {

                    rsvpEmail.focus();

                }


                return;

            }



            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



            if (
                !emailPattern.test(
                    email
                )
            ) {


                setRSVPMessage(

                    "Please enter a valid email address.",

                    "error"

                );


                if (
                    rsvpEmail
                ) {

                    rsvpEmail.focus();

                }


                return;

            }



            // =================================================
            // SUBMITTING STATE
            // =================================================

            rsvpSubmitting =
                true;



            setRSVPMessage(

                "Reserving your spot and creating your QR ticket...",

                ""

            );



            if (
                rsvpName
            ) {

                rsvpName.disabled =
                    true;

            }



            if (
                rsvpEmail
            ) {

                rsvpEmail.disabled =
                    true;

            }



            if (
                rsvpButton
            ) {

                rsvpButton.disabled =
                    true;


                rsvpButton.textContent =
                    "CREATING RSVP...";

            }



            submitRSVP(
                name,
                email
            );

        }
    );

}



// =====================================================
// ♠ INITIAL CAPACITY LOAD
// =====================================================

loadCapacity();



// =====================================================
// ♠ REFRESH AVAILABILITY
//
// Keeps the displayed RSVP availability
// reasonably current while somebody has
// the page open.
// =====================================================

setInterval(
    loadCapacity,
    60000
);



// =====================================================
//
//                ♠ END FREDSGIVING JS ♠
//
// =====================================================