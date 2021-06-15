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

let usersCalcArr = [];
let dashboardBtnCalcs = [];
let dashboardSeverityBtn = [];
let usersArr = [];
let mainTableIndex = 0;

let severityCounter = [0, 0, 0, 0];

/** */
let policiesArr = undefined
function a(status, user, userI, policy) {
    if (userI) {
        insertRowCalc(userI.companyUserId, userI.PrevinsuranceCompanyName, userI.RequestNumber, userI.Previousinsurancenumber, userI.PrevinsuranceID, userI.insuranceCompanyfee, user.insuranceEnable, user.dateofEnblment, user.CarStatus, user.UserRank, user.message)
    }

    $(function () {
        $(".custom-close").on('click', function () {
            $('#myModal').modal('hide');
        });
    });
}

function showCalcDetails(event, $modal) {
    var button = $(event.relatedTarget);  // Button that triggered the modal
    var num = parseInt(button.data('num'));
    var details = dashboardBtnCalcs[num];
    var x = getOptions(num, details);
    $modal.find('.modal-body').empty().append(x[0][0]);
    $modal.find('.modal-footer').empty().append(x[1][0]);
}

function updateSeverity(severity, indexInMainTable) {
    var theBtn = dashboardSeverityBtn[indexInMainTable];
    switch (severity) {
        case "Low":
            theBtn.innerHTML = "LOW"
            theBtn.setAttribute("class", 'btn btn-primary');
            severityCounter[0]++;
            break;
        case "Mid":
            theBtn.innerHTML = "MID"
            theBtn.setAttribute("class", 'btn btn-success')
            severityCounter[1]++;
            break;
        case "High":
            theBtn.innerHTML = "HIGH"
            theBtn.setAttribute("class", 'btn btn-warning');
            severityCounter[2]++;
            break;
        case "Severe":
            theBtn.innerHTML = "SEVERE"
            theBtn.setAttribute("class", 'btn btn-danger');
            severityCounter[3]++;
            break;
    }
    myChart.data.datasets[0].data[0] = severityCounter[0];
    myChart.data.datasets[0].data[1] = severityCounter[1];
    myChart.data.datasets[0].data[2] = severityCounter[2];
    myChart.data.datasets[0].data[3] = severityCounter[3];
    myChart.data.datasets[0].data[4] = 0;
    myChart.update();

    //update status
    var table = document.getElementById('dataTable1');
    table.rows[indexInMainTable + 1].cells[4].innerHTML = '<b>Reviewed</b><i class="far fa-check-circle"></i>';
    //
}

function getOptions(num, details) {
    var $buttonDiv = $(
        `
        <table class="table table-bordered" id="userDataTable" width="100%"
        cellspacing="0" style="text-align: center;">
        <thead>
            <tr>
                <th>Company User ID</th>
                <th>Previous Company</th>
                <th>Request Number</th>
                <th>Previous Insurance Number</th>
                <th>Previous Insurance ID</th>
                <th>Insurance Company Fee</th>
                <th>Insurance Enable</th>
                <th>Date Of Enablement</th>
                <th>Car Status</th>
                <th>User Rank</th>
                <th>Message</th>
            </tr>
        </thead>
        </table>
        `);

    var $tableBody = $('<tbody></tbody>');
    var newRow = $tableBody[0].insertRow();

    var u = []
    const a0 = usersArr[num]
    const a = a0.insuranceData[0]
    u.push(a.companyUserId)
    u.push(a.PrevinsuranceCompanyName)
    u.push(a.RequestNumber)
    u.push(a.Previousinsurancenumber)
    u.push(a.PrevinsuranceID)
    u.push(a.insuranceCompanyfee)
    //
    u.push(a0.insuranceEnable)
    u.push(a0.dateofEnblment)
    u.push(a0.CarStatus)
    u.push(a0.UserRank)
    u.push(a0.message)

    for (var i = 0; i < u.length; i++) {
        var newCell = newRow.insertCell();
        var newTxt = document.createTextNode(u[i]);
        newCell.appendChild(newTxt);
    }
    $buttonDiv.append($tableBody);
    var x = []
    x.push($buttonDiv)
    var $updateSeverityBtn = $(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`);
    //
    var rankTitle = "";
    for (let i = 0; i < policiesArr.length; i++) {
        if (policiesArr[i].UserRank == u[9] && policiesArr[i].StartInsuranceDate == u[7]) {
            rankTitle = policiesArr[i].severity;
            break;
        }
    }
    $updateSeverityBtn[0].addEventListener('click', updateSeverity(rankTitle, num));
    x.push($updateSeverityBtn)
    return x;
}

$(function () {
    $("#myModal").on('show.bs.modal', function (event) {
        showCalcDetails(event, $(this));
        event.relatedTarget.disabled = true;
    });
});

a('show');


// a('hide')
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

let usercontant = (document.getElementById("usercontent").innerHTML = usercontantHTML);

//
function insertRowMain(severity, category, name, amount, status, sueDate) {
    var tableBodyRef = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    var newRow = tableBodyRef.insertRow();
    for (var i = 0; i < arguments.length; i++) {
        var newCell = newRow.insertCell();
        var newTxt = document.createTextNode(arguments[i]);
        newCell.appendChild(newTxt);
    }
}
class Policy {
    constructor(severity, insuranceEnable, StartInsuranceDate, EndInsuranceDate, insuranceCompany, CarStatus, UserRank) {
        this.severity = severity;
        this.insuranceEnable = insuranceEnable;
        this.StartInsuranceDate = StartInsuranceDate;
        this.EndInsuranceDate = EndInsuranceDate;
        this.insuranceCompany = insuranceCompany;
        this.CarStatus = CarStatus;
        this.UserRank = UserRank;
    }
}

class AllPolicies {
    severity;
    insuranceEnable; StartInsuranceDate; EndInsuranceDate; insuranceCompany; CarStatus; UserRank;

    constructor(data) {
        this.init(data)
    }

    init(data) {
        this.policies = [];
        var temp;
        var size = Object.keys(data).length;
        for (var i = 0; i < 4; i++) {
            let x = data[Object.keys(data)[i]]
            for (var j = 0; j < x.length; j++) {
                temp = new Policy(Object.keys(data)[i], x[j].insuranceEnable, x[j].StartInsuranceDate, x[j].EndInsuranceDate, x[j].insuranceCompany, x[j].CarStatus, x[j].UserRank)
                this.policies.push(temp)
            }
        }
        return this.policies
    }
}


function getPoliciesData() {
    return $.ajax(
        {
            async: false,
            url: "/api/get_policies_data",
            type: "GET",
            success: function (data) {
                policiesArr = new AllPolicies(data).policies
            }
        }
    );
}

function getUsersData() {
    return $.ajax(
        {
            async: false,
            url: "/api/get_users_data",
            type: "GET",
            success: function (data) {
                initUsersArr(data)
            }
        }
    );
}


function initUsersArr(data) {
    for (let i = 0; i < data.length; i++)
        usersArr.push(new User(data[i].insuranceType, data[i].FirstName, data[i].LastName, data[i].insuranceAmountRequested, data[i].insuranceCompanyName, data[i].insuranceData, data[i].insuranceEnable, data[i].dateofEnblment, data[i].CarStatus, data[i].UserRank, data[i].message))

}

async function waitTable() {
    try {
        const res = await getPoliciesData()
        const res2 = await getUsersData()
        console.log(res)
        return [res, res2]
    } catch (err) {
        console.error(err)
    }
}



let mainRowsArr = new Array()

async function insertPolicyToTable() {
    try {
        await waitTable()
    } catch (error) {
        console.log(error)
    }
    var tableBodyRef = document.getElementById('dataTable1').getElementsByTagName('tbody')[0];

    for (var i = 0; i < usersArr.length; i++) {
        var newRow = tableBodyRef.insertRow();
        newRow.id = "rowId";
        //
        var newCell = newRow.insertCell();
        var newBtn = document.createElement('button');
        newBtn.setAttribute("data-num", mainTableIndex);
        newBtn.setAttribute("class", 'btn btn-secondary btn-lg disabled');
        newCell.appendChild(newBtn);
        dashboardSeverityBtn.push(newBtn);
        //
        var newCell = newRow.insertCell();
        var newTxt = document.createTextNode(usersArr[i].insuranceType);
        newCell.appendChild(newTxt);
        var newCell = newRow.insertCell();
        var newTxt = document.createTextNode(usersArr[i].FirstName + ' ' + usersArr[i].LastName);
        newCell.appendChild(newTxt);
        var newCell = newRow.insertCell();
        var newTxt = document.createTextNode(usersArr[i].insuranceAmountRequested + '$');
        newCell.appendChild(newTxt);
        //
        var newCell = newRow.insertCell(); {
            for (let j = 0; j < usersArr[i].insuranceData.length; j++)
                var newTxt = document.createTextNode(usersArr[i].insuranceData[j].status);
            newCell.appendChild(newTxt);
        }
        //
        var newCell = newRow.insertCell();
        let t = usersArr[i].dateofEnblment
        t = t.slice(0, 2) + '/' + t.slice(2, 4) + "/" + t.slice(4, 8)
        var newTxt = document.createTextNode(t);
        newCell.appendChild(newTxt);
        //
        var newCell = newRow.insertCell();

        var tmpBtn = document.createElement('button');
        tmpBtn.type = "button";
        tmpBtn.setAttribute("class", "btn btn-success");
        tmpBtn.setAttribute("data-toggle", "modal");
        tmpBtn.setAttribute("data-target", "#myModal");
        tmpBtn.setAttribute("data-num", mainTableIndex);
        tmpBtn.setAttribute("id", "calcBtn" + mainTableIndex);
        tmpBtn.innerHTML = `<i class="fas fa-calculator"></i> Calculate`;
        newCell.appendChild(tmpBtn);
        dashboardBtnCalcs.push(tmpBtn);
        mainTableIndex++;
    }
    $(document).ready(function () {
        $('#dataTable1').DataTable();
    });
}

insertPolicyToTable();

/** calculate and div */
function insertRowCalc(companyUserId, PrevinsuranceCompanyName, RequestNumber, Previousinsurancenumber, PrevinsuranceID, insuranceCompanyfee, insuranceEnable, dateofEnblment, CarStatus, UserRank, message) {
    var newTable = document.createElement('table')
    newTable.className = 'table table-bordered'
    newTable.width = "100%"
    newTable.cellSpacing = "0"
    newTable.style = "text-align: center;"
    newTable.innerHTML =
        `<tr>
    <th>Company User ID</th>
    <th>Previous Company</th>
    <th>Request Number</th>
    <th>Previous Insurance Number</th>
    <th>Previous Insurance ID</th>
    <th>Insurance Company Fee</th>
    <th>Insurance Enable</th>
    <th>Date Of Enablement</th>
    <th>Car Status</th>
    <th>User Rank</th>
    <th>Message</th>
    </tr>`
    var newRow = newTable.insertRow();
    for (var i = 0; i < arguments.length; i++) {
        var newCell = newRow.insertCell();
        var newTxt = document.createTextNode(arguments[i]);
        newCell.appendChild(newTxt);
    }
    usersCalcArr.push(newTable);
}

class User {
    insuranceData = []
    constructor(insuranceType, FirstName, LastName, insuranceAmountRequested, insuranceCompanyName, insuranceData, insuranceEnable, dateofEnblment, CarStatus, UserRank, message) {
        this.insuranceType = insuranceType
        this.FirstName = FirstName
        this.LastName = LastName
        this.insuranceAmountRequested = insuranceAmountRequested
        this.insuranceCompanyName = insuranceCompanyName
        this.insuranceEnable = insuranceEnable
        this.dateofEnblment = dateofEnblment
        this.CarStatus = CarStatus
        this.UserRank = UserRank
        this.message = message
        for (let i = 0; i < insuranceData.length; i++)
            this.insuranceData.push(new Insurance(insuranceData[i].companyUserId, insuranceData[i].PrevinsuranceCompanyName, insuranceData[i].RequestNumber, insuranceData[i].Previousinsurancenumber, insuranceData[i].PrevinsuranceID, insuranceData[i].insuranceCompanyfee))
    }

    getUser() { }
}

class Insurance {
    status = "In Review"
    constructor(companyUserId, PrevinsuranceCompanyName, RequestNumber, Previousinsurancenumber, PrevinsuranceID, insuranceCompanyfee) {
        this.companyUserId = companyUserId
        this.PrevinsuranceCompanyName = PrevinsuranceCompanyName
        this.RequestNumber = RequestNumber
        this.Previousinsurancenumber = Previousinsurancenumber
        this.PrevinsuranceID = PrevinsuranceID
        this.insuranceCompanyfee = insuranceCompanyfee
    }

    changeStatus() {
        if (this.status == "In Review") this.status = "Reviewed"
        else {
            this.status == "In Review"
        }
    }
}

/**chart */

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["LOW", "MID", "HIGH", "SEVERE"],
        datasets: [{
            backgroundColor: [
                "#007bff",
                "#28a745",
                "#ffc107",
                "#dc3545",
                "#f2f2f2"
            ],
            data: [0, 0, 0, 0, 1],
            borderColor: "black"
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Pie Chart'
            }
        }
    }
});

const actions = [
    {
        name: 'Randomize',
        handler(chart) {
            chart.data.datasets.forEach(dataset => {
                dataset.data = Utils.numbers({ count: chart.data.labels.length, min: 0, max: 100 });
            });
            chart.update();
        }
    },
    {
        name: 'Add Dataset',
        handler(chart) {
            const data = chart.data;
            const newDataset = {
                label: 'Dataset ' + (data.datasets.length + 1),
                backgroundColor: [],
                data: [],
            };

            for (let i = 0; i < data.labels.length; i++) {
                newDataset.data.push(Utils.numbers({ count: 1, min: 0, max: 100 }));

                const colorIndex = i % Object.keys(Utils.CHART_COLORS).length;
                newDataset.backgroundColor.push(Object.values(Utils.CHART_COLORS)[colorIndex]);
            }

            chart.data.datasets.push(newDataset);
            chart.update();
        }
    },
    {
        name: 'Add Data',
        handler(chart) {
            const data = chart.data;
            if (data.datasets.length > 0) {
                data.labels.push('data #' + (data.labels.length + 1));

                for (var index = 0; index < data.datasets.length; ++index) {
                    data.datasets[index].data.push(Utils.rand(0, 100));
                }

                chart.update();
            }
        }
    },
    {
        name: 'Remove Dataset',
        handler(chart) {
            chart.data.datasets.pop();
            chart.update();
        }
    },
    {
        name: 'Remove Data',
        handler(chart) {
            chart.data.labels.splice(-1, 1); // remove the label first

            chart.data.datasets.forEach(dataset => {
                dataset.data.pop();
            });

            chart.update();
        }
    }
];

