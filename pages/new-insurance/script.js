function openModal(status, title, body) {
    var btn1 = document.getElementById("modal-btn1");
    if (status == 1) {
        document.getElementById('modalTitle').innerText = `Your request number is ${body}\nWe will review your request and will contact you soon!`;
        btn1.innerText = 'Review the form';
        document.getElementById("submit-btn").disabled = true;
        document.getElementById("submit-btn").setAttribute("class", "btn btn-secondary");
    } else {
        document.getElementById('myModalLabel').innerText = 'New insurance request failed!'
        document.getElementById('modalTitle').innerText = `Reason: ${body}`;
        btn1.innerText = 'Try again';
        btn1.addEventListener('click', function (ev) {
            document.location.reload(true);
        })

    }
    $('#myModal').modal('show')
}

$(function () {
    $(".custom-close").on('click', function () {
        $('#myModal').modal('hide');
    });
});
/* End Modal */


//
const sidebarHTML = `            <!-- Sidebar - Brand -->
<a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
    <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-chart-area"></i>
    </div>
    <div class="sidebar-brand-text mx-3">Insurance</div>
</a>

<!-- Divider -->
<hr class="sidebar-divider my-0">

<!-- Nav Item - Dashboard -->
<li class="nav-item active">
    <a class="nav-link" href="/pages/dashboard/index.html">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></a>
</li>
<!-- Divider -->
<hr class="sidebar-divider my-0">

<!-- Nav Item - Users -->
<li class="nav-item active">
    <a class="nav-link" href="/pages/users/index.html">
        <i class="far fa-file-alt"></i>
        <span>Users</span></a>
</li>
<!-- Divider -->
<hr class="sidebar-divider my-0">

<!-- Nav Item - New Insurance -->
<li class="nav-item active">
    <a class="nav-link" href="/pages/new-insurance/index.html">
        <i class="far fa-file-alt"></i>
        <span>New Insurance</span></a>
</li>
<!-- Divider -->
<hr class="sidebar-divider d-none d-md-block">

<!-- Sidebar Toggler (Sidebar) -->
<div class="text-center d-none d-md-inline">
    <button class="rounded-circle border-0" id="sidebarToggle"></button>
</div>
`;

let accordionSidebar = document.getElementById("accordionSidebar");
accordionSidebar.innerHTML = sidebarHTML;

//

const scriptsHTML = `                
<!-- Bootstrap core JavaScript-->
<script src="../../vendor/jquery/jquery.min.js"></script>
<script src="../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="../../vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Custom scripts for all pages-->
<script src="../../js/sb-admin-2.min.js"></script>

<!-- Page level plugins -->
<script src="../../vendor/datatables/jquery.dataTables.min.js"></script>
<script src="../../vendor/datatables/dataTables.bootstrap4.min.js"></script>

<!-- Page level custom scripts -->
<script src="../../js/demo/datatables-demo.js"></script>`;



let scripts = (document.getElementById("scripts").innerHTML = scriptsHTML);

//

const usercontantHTML = `                <!-- Topbar -->
<nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <!-- Sidebar Toggle (Topbar) -->
    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
        <i class="fa fa-bars"></i>
    </button>
    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
        <div class="topbar-divider d-none d-sm-block"></div>
        <!-- Nav Item - User Information -->
        <li class="nav-item dropdown no-arrow">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">Class</span>
                <img class="img-profile rounded-circle" src="../../vendor/img/undraw_profile.svg">
            </a>
            <!-- Dropdown - User Information -->
            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile
                </a>
                <a class="dropdown-item" href="#">
                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> Settings
                </a>
                <a class="dropdown-item" href="#">
                    <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i> Activity Log
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
                </a>
            </div>
        </li>
    </ul>
</nav>
<!-- End of Topbar -->`;

let usercontant = (document.getElementById("usercontent").innerHTML =
    usercontantHTML);

//
const footerHTML =
    `
<footer class="sticky-footer bg-white">
<div class="container my-auto">
    <div class="copyright text-center my-auto">
    <span>Daniel Gabbay &amp; Noy Cohen &amp; Gefen Margolin &amp; Adi Oren</span>
    <br>
        <span>final Client-Server project 2021</span>
    </div>
</div>
</footer>
<!-- End of Footer -->
`
let footers = document.getElementById('footers').innerHTML = footerHTML;

function postNewInsurance(json) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/post_insurance',
            type: 'POST',
            data: json,
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            },
        })
    })
};

function validate() {
    var inputs = document.getElementsByClassName('form-control');
    var valid = true;
    var validation = Array.prototype.filter.call(inputs, function (input) {
        if (input.checkValidity() === false) {
            input.classList.add('is-invalid')
            valid = false;
        }
        else {
            input.classList.add('is-valid')
        }
    });
    return valid;
}

var post_insurance = document.getElementById('postInsuranceID');
function submitform(e) {
        if (validate()) {
        //
        var socialnumber = document.getElementById('socialnumber');
        var emailaddress = document.getElementById('emailaddress');
        var firstname = document.getElementById('firstname');
        var lastname = document.getElementById('lastname');
        var phonenumber = document.getElementById('phonenumber');
        var insuranceamount = document.getElementById('insuranceamount');
        var previnsurancenum = document.getElementById('previnsurancenum');
        var previnsuranceid = document.getElementById('previnsuranceid');
        var form6Example7 = document.getElementById('comments');
        //
        var prevInsuranceCompany = document.getElementById('prevcompany').selectedIndex;
        switch (prevInsuranceCompany) {
            case 1:
                prevInsuranceCompany = "Harel"
                break;
            case 2:
                prevInsuranceCompany = "Yashir"
                break;
            case 3:
                prevInsuranceCompany = "Migdal"
                break;
        }
        //

        var json = {
            "email": emailaddress.value,
            "firstName": firstname.value,
            "insuranceAmount": insuranceamount.value,
            "lastName": lastname.value,
            "phoneNumber": phonenumber.value,
            "prevInsuranceCompany": prevInsuranceCompany,
            "prevInsuranceID": previnsuranceid.value,
            "prevInsuranceNumber": previnsurancenum.value,
            socialNumber: socialnumber.value,
            "comments": form6Example7.value
        }

        postNewInsurance(json)
            .then((data) => {
                console.log("post new_insurance success!!: ")
                openModal(1, "", data)
            })
            .catch((error) => {
                console.log("post new_insurance failed!!")
                openModal(2, undefined, error.responseText)
            })
    }
};

//jquery
(function ($) {

    "use strict"; // Start of use strict

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function () {
        if ($(window).width() < 768) {
            $('.sidebar .collapse').collapse('hide');
        };

        // Toggle the side navigation when window is resized below 480px
        if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
            $("body").addClass("sidebar-toggled");
            $(".sidebar").addClass("toggled");
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
        if ($(window).width() > 768) {
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        }
    });

    // Scroll to top button appear
    $(document).on('scroll', function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function (e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });

})(jQuery); // End of use strict
