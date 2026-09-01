/* =====================================================
   THE BIBI HUB
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   HELPER FUNCTIONS
===================================================== */

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
        return [];
    }
}


/* =====================================================
   MAIN NAVIGATION
===================================================== */

function openSection(sectionId) {

    document.querySelectorAll(".hub-section").forEach(section => {
        section.style.display = "none";
    });

    document.querySelector(".welcome").style.display = "none";
    document.querySelector(".hub-grid").style.display = "none";

    const section = document.getElementById(sectionId);

    if (section) {
        section.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function goHome() {

    document.querySelectorAll(".hub-section").forEach(section => {
        section.style.display = "none";
    });

    const welcome = document.querySelector(".welcome");
    const hubGrid = document.querySelector(".hub-grid");

    if (welcome) welcome.style.display = "block";
    if (hubGrid) hubGrid.style.display = "grid";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   BUSINESS NAVIGATION
===================================================== */

function showBusinessPage(page) {

    document.querySelectorAll("#business .business-page").forEach(pageElement => {
        pageElement.style.display = "none";
    });

    const selectedPage = document.getElementById(page);

    if (selectedPage) {
        selectedPage.style.display = "block";
    }
}


function backToBusiness() {

    document.querySelectorAll("#business .business-page").forEach(page => {
        page.style.display = "none";
    });
}


/* =====================================================
   BUSINESS - PRODUCTS
===================================================== */

let products = getData("bibiProducts");


function addProduct() {

    const name = document.getElementById("productName");
    const price = document.getElementById("productPrice");
    const status = document.getElementById("productStatus");

    if (!name || !price || !status) return;

    const productName = name.value.trim();
    const productPrice = price.value;
    const productStatus = status.value;

    if (productName === "" || productPrice === "") {
        alert("Please enter the product name and price.");
        return;
    }

    products.push({
        name: productName,
        price: Number(productPrice),
        status: productStatus
    });

    saveData("bibiProducts", products);

    name.value = "";
    price.value = "";

    displayProducts();
}


function displayProducts() {

    const list = document.getElementById("productList");

    if (!list) return;

    list.innerHTML = "";

    if (products.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>No products added yet.</p>
            </div>
        `;

        return;
    }

    products.forEach((product, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>${product.name}</h3>

                <p>Price: ₦${Number(product.price).toLocaleString()}</p>

                <p>Status: ${product.status}</p>

                <button onclick="deleteProduct(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deleteProduct(index) {

    products.splice(index, 1);

    saveData("bibiProducts", products);

    displayProducts();
}


/* =====================================================
   BUSINESS - ORDERS
===================================================== */

let orders = getData("bibiOrders");


function addOrder() {

    const customer = document.getElementById("customerName");
    const item = document.getElementById("orderItem");
    const status = document.getElementById("orderStatus");

    if (!customer || !item || !status) return;

    const customerName = customer.value.trim();
    const orderItem = item.value.trim();

    if (customerName === "" || orderItem === "") {

        alert("Please enter the customer name and product ordered.");

        return;
    }

    orders.push({
        customer: customerName,
        item: orderItem,
        status: status.value,
        date: new Date().toLocaleDateString()
    });

    saveData("bibiOrders", orders);

    customer.value = "";
    item.value = "";

    displayOrders();
}


function displayOrders() {

    const list = document.getElementById("orderList");

    if (!list) return;

    list.innerHTML = "";

    if (orders.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>No orders recorded yet.</p>
            </div>
        `;

        return;
    }

    orders.forEach((order, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>${order.customer}</h3>

                <p>Product: ${order.item}</p>

                <p>Status: ${order.status}</p>

                <p>Date: ${order.date}</p>

                <button onclick="deleteOrder(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deleteOrder(index) {

    orders.splice(index, 1);

    saveData("bibiOrders", orders);

    displayOrders();
}


/* =====================================================
   BUSINESS - FINANCE
===================================================== */

let transactions = getData("bibiTransactions");


function addTransaction() {

    const type = document.getElementById("transactionType");
    const amount = document.getElementById("transactionAmount");

    if (!type || !amount) return;

    const transactionAmount = Number(amount.value);

    if (!transactionAmount || transactionAmount <= 0) {

        alert("Please enter a valid amount.");

        return;
    }

    transactions.push({
        type: type.value,
        amount: transactionAmount,
        date: new Date().toLocaleDateString()
    });

    saveData("bibiTransactions", transactions);

    amount.value = "";

    displayTransactions();
}


function displayTransactions() {

    const list = document.getElementById("transactionList");

    if (!list) return;

    list.innerHTML = "";

    let totalSales = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "sale") {
            totalSales += Number(transaction.amount);
        }

        if (transaction.type === "expense") {
            totalExpenses += Number(transaction.amount);
        }
    });

    const balance = totalSales - totalExpenses;

    const salesElement = document.getElementById("totalSales");
    const expensesElement = document.getElementById("totalExpenses");
    const balanceElement = document.getElementById("balance");

    if (salesElement) {
        salesElement.textContent =
            "₦" + totalSales.toLocaleString();
    }

    if (expensesElement) {
        expensesElement.textContent =
            "₦" + totalExpenses.toLocaleString();
    }

    if (balanceElement) {
        balanceElement.textContent =
            "₦" + balance.toLocaleString();
    }


    if (transactions.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>No transactions recorded yet.</p>
            </div>
        `;

        return;
    }


    transactions.forEach((transaction, index) => {

        const label =
            transaction.type === "sale"
                ? "Sale"
                : "Expense";

        list.innerHTML += `
            <div class="list-item">

                <h3>${label}</h3>

                <p>
                    Amount: ₦${Number(transaction.amount).toLocaleString()}
                </p>

                <p>Date: ${transaction.date}</p>

                <button onclick="deleteTransaction(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deleteTransaction(index) {

    transactions.splice(index, 1);

    saveData("bibiTransactions", transactions);

    displayTransactions();
}


/* =====================================================
   BUSINESS - GOALS
===================================================== */

let businessGoals = getData("bibiBusinessGoals");


function addGoal() {

    const input = document.getElementById("goalInput");

    if (!input) return;

    const goal = input.value.trim();

    if (goal === "") {

        alert("Please enter a business goal.");

        return;
    }

    businessGoals.push({
        text: goal,
        completed: false
    });

    saveData("bibiBusinessGoals", businessGoals);

    input.value = "";

    displayBusinessGoals();
}


function displayBusinessGoals() {

    const list = document.getElementById("goalList");

    if (!list) return;

    list.innerHTML = "";

    if (businessGoals.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>No business goals added yet.</p>
            </div>
        `;

        return;
    }

    businessGoals.forEach((goal, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>
                    ${goal.completed ? "✅" : "🎯"}
                    ${goal.text}
                </h3>

                <button onclick="toggleBusinessGoal(${index})">
                    ${goal.completed ? "Mark Unfinished" : "Mark Complete"}
                </button>

                <button onclick="deleteBusinessGoal(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function toggleBusinessGoal(index) {

    businessGoals[index].completed =
        !businessGoals[index].completed;

    saveData("bibiBusinessGoals", businessGoals);

    displayBusinessGoals();
}


function deleteBusinessGoal(index) {

    businessGoals.splice(index, 1);

    saveData("bibiBusinessGoals", businessGoals);

    displayBusinessGoals();
}


/* =====================================================
   CONTENT HUB NAVIGATION
===================================================== */

function showContentPage(page) {

    document.querySelectorAll("#content .business-page").forEach(pageElement => {
        pageElement.style.display = "none";
    });

    const selectedPage =
        document.getElementById("content-" + page);

    if (selectedPage) {
        selectedPage.style.display = "block";
    }
}


function backToContent() {

    document.querySelectorAll("#content .business-page").forEach(page => {
        page.style.display = "none";
    });
}


/* =====================================================
   CONTENT IDEAS
===================================================== */

let contentIdeas = getData("bibiContentIdeas");


function addContentIdea() {

    const input =
        document.getElementById("contentIdeaInput");

    if (!input) return;

    const idea = input.value.trim();

    if (idea === "") {

        alert("Please enter a content idea.");

        return;
    }

    contentIdeas.push({
        text: idea,
        date: new Date().toLocaleDateString()
    });

    saveData("bibiContentIdeas", contentIdeas);

    input.value = "";

    displayContentIdeas();
}


function displayContentIdeas() {

    const list =
        document.getElementById("contentIdeaList");

    if (!list) return;

    list.innerHTML = "";

    if (contentIdeas.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>💡 No content ideas saved yet.</p>
            </div>
        `;

        return;
    }

    contentIdeas.forEach((idea, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>💡 ${idea.text}</h3>

                <p>Saved: ${idea.date}</p>

                <button onclick="deleteContentIdea(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deleteContentIdea(index) {

    contentIdeas.splice(index, 1);

    saveData("bibiContentIdeas", contentIdeas);

    displayContentIdeas();
}


/* =====================================================
   WEEKLY CONTENT PLANNER
===================================================== */

let plannedContent = getData("bibiPlannedContent");


function addPlannedContent() {

    const day =
        document.getElementById("contentDay");

    const content =
        document.getElementById("plannedContent");

    if (!day || !content) return;

    const text = content.value.trim();

    if (text === "") {

        alert("Please enter what you want to post.");

        return;
    }

    plannedContent.push({
        day: day.value,
        content: text
    });

    saveData("bibiPlannedContent", plannedContent);

    content.value = "";

    displayPlannedContent();
}


function displayPlannedContent() {

    const list =
        document.getElementById("contentPlannerList");

    if (!list) return;

    list.innerHTML = "";

    if (plannedContent.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>📅 No content planned yet.</p>
            </div>
        `;

        return;
    }

    plannedContent.forEach((item, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>📅 ${item.day}</h3>

                <p>${item.content}</p>

                <button onclick="deletePlannedContent(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deletePlannedContent(index) {

    plannedContent.splice(index, 1);

    saveData("bibiPlannedContent", plannedContent);

    displayPlannedContent();
}


/* =====================================================
   CAMPAIGNS
===================================================== */

let campaigns = getData("bibiCampaigns");


function addCampaign() {

    const name =
        document.getElementById("campaignName");

    const goal =
        document.getElementById("campaignGoal");

    if (!name || !goal) return;

    const campaignName = name.value.trim();
    const campaignGoal = goal.value.trim();

    if (campaignName === "" || campaignGoal === "") {

        alert("Please enter the campaign name and goal.");

        return;
    }

    campaigns.push({
        name: campaignName,
        goal: campaignGoal
    });

    saveData("bibiCampaigns", campaigns);

    name.value = "";
    goal.value = "";

    displayCampaigns();
}


function displayCampaigns() {

    const list =
        document.getElementById("campaignList");

    if (!list) return;

    list.innerHTML = "";

    if (campaigns.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>📣 No campaigns created yet.</p>
            </div>
        `;

        return;
    }

    campaigns.forEach((campaign, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>📣 ${campaign.name}</h3>

                <p>Goal: ${campaign.goal}</p>

                <button onclick="deleteCampaign(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deleteCampaign(index) {

    campaigns.splice(index, 1);

    saveData("bibiCampaigns", campaigns);

    displayCampaigns();
}


/* =====================================================
   POSTED CONTENT
===================================================== */

let postedContent = getData("bibiPostedContent");


function addPostedContent() {

    const title =
        document.getElementById("postedTitle");

    const platform =
        document.getElementById("postedPlatform");

    if (!title || !platform) return;

    const postedTitle = title.value.trim();
    const postedPlatform = platform.value.trim();

    if (postedTitle === "" || postedPlatform === "") {

        alert("Please enter the content title and platform.");

        return;
    }

    postedContent.push({
        title: postedTitle,
        platform: postedPlatform,
        date: new Date().toLocaleDateString()
    });

    saveData("bibiPostedContent", postedContent);

    title.value = "";
    platform.value = "";

    displayPostedContent();
}


function displayPostedContent() {

    const list =
        document.getElementById("postedContentList");

    if (!list) return;

    list.innerHTML = "";

    if (postedContent.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>📱 No posted content recorded yet.</p>
            </div>
        `;

        return;
    }

    postedContent.forEach((post, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>📱 ${post.title}</h3>

                <p>Platform: ${post.platform}</p>

                <p>Date: ${post.date}</p>

                <button onclick="deletePostedContent(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deletePostedContent(index) {

    postedContent.splice(index, 1);

    saveData("bibiPostedContent", postedContent);

    displayPostedContent();
}


/* =====================================================
   MODELLING & GOALS NAVIGATION
===================================================== */

function showModellingPage(page) {

    document.querySelectorAll("#modelling .business-page").forEach(pageElement => {
        pageElement.style.display = "none";
    });

    const selectedPage =
        document.getElementById("model-" + page);

    if (selectedPage) {
        selectedPage.style.display = "block";
    }
}


function backToModelling() {

    document.querySelectorAll("#modelling .business-page").forEach(page => {
        page.style.display = "none";
    });
}


/* =====================================================
   PORTFOLIO IDEAS
===================================================== */

let portfolioIdeas = getData("bibiPortfolioIdeas");


function addPortfolioIdea() {

    const input =
        document.getElementById("portfolioInput");

    if (!input) return;

    const idea = input.value.trim();

    if (idea === "") {

        alert("Please enter a portfolio idea.");

        return;
    }

    portfolioIdeas.push({
        text: idea,
        date: new Date().toLocaleDateString()
    });

    saveData("bibiPortfolioIdeas", portfolioIdeas);

    input.value = "";

    displayPortfolioIdeas();
}


function displayPortfolioIdeas() {

    const list =
        document.getElementById("portfolioList");

    if (!list) return;

    list.innerHTML = "";

    if (portfolioIdeas.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>📸 No portfolio ideas saved yet.</p>
            </div>
        `;

        return;
    }

    portfolioIdeas.forEach((idea, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>📸 ${idea.text}</h3>

                <p>Date: ${idea.date}</p>

                <button onclick="deletePortfolioIdea(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deletePortfolioIdea(index) {

    portfolioIdeas.splice(index, 1);

    saveData("bibiPortfolioIdeas", portfolioIdeas);

    displayPortfolioIdeas();
}


/* =====================================================
   OPPORTUNITIES
===================================================== */

let opportunities = getData("bibiOpportunities");


function addOpportunity() {

    const input =
        document.getElementById("opportunityInput");

    if (!input) return;

    const opportunity = input.value.trim();

    if (opportunity === "") {

        alert("Please enter an opportunity.");

        return;
    }

    opportunities.push({
        text: opportunity,
        date: new Date().toLocaleDateString()
    });

    saveData("bibiOpportunities", opportunities);

    input.value = "";

    displayOpportunities();
}


function displayOpportunities() {

    const list =
        document.getElementById("opportunityList");

    if (!list) return;

    list.innerHTML = "";

    if (opportunities.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>✨ No opportunities saved yet.</p>
            </div>
        `;

        return;
    }

    opportunities.forEach((opportunity, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>✨ ${opportunity.text}</h3>

                <p>Date: ${opportunity.date}</p>

                <button onclick="deleteOpportunity(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deleteOpportunity(index) {

    opportunities.splice(index, 1);

    saveData("bibiOpportunities", opportunities);

    displayOpportunities();
}


/* =====================================================
   PROFESSIONAL GOALS
===================================================== */

let professionalGoals =
    getData("bibiProfessionalGoals");


function addProfessionalGoal() {

    const input =
        document.getElementById("professionalGoalInput");

    if (!input) return;

    const goal = input.value.trim();

    if (goal === "") {

        alert("Please enter a professional goal.");

        return;
    }

    professionalGoals.push({
        text: goal,
        completed: false
    });

    saveData(
        "bibiProfessionalGoals",
        professionalGoals
    );

    input.value = "";

    displayProfessionalGoals();
}


function displayProfessionalGoals() {

    const list =
        document.getElementById("professionalGoalList");

    if (!list) return;

    list.innerHTML = "";

    if (professionalGoals.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>🎯 No professional goals added yet.</p>
            </div>
        `;

        return;
    }

    professionalGoals.forEach((goal, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>
                    ${goal.completed ? "✅" : "🎯"}
                    ${goal.text}
                </h3>

                <button onclick="toggleProfessionalGoal(${index})">
                    ${goal.completed ? "Mark Unfinished" : "Mark Complete"}
                </button>

                <button onclick="deleteProfessionalGoal(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function toggleProfessionalGoal(index) {

    professionalGoals[index].completed =
        !professionalGoals[index].completed;

    saveData(
        "bibiProfessionalGoals",
        professionalGoals
    );

    displayProfessionalGoals();
}


function deleteProfessionalGoal(index) {

    professionalGoals.splice(index, 1);

    saveData(
        "bibiProfessionalGoals",
        professionalGoals
    );

    displayProfessionalGoals();
}


/* =====================================================
   MODELLING PROGRESS
===================================================== */

let modellingProgress =
    getData("bibiModellingProgress");


function addProgress() {

    const input =
        document.getElementById("progressInput");

    if (!input) return;

    const progress = input.value.trim();

    if (progress === "") {

        alert("Please enter your progress.");

        return;
    }

    modellingProgress.push({
        text: progress,
        date: new Date().toLocaleDateString()
    });

    saveData(
        "bibiModellingProgress",
        modellingProgress
    );

    input.value = "";

    displayProgress();
}


function displayProgress() {

    const list =
        document.getElementById("progressList");

    if (!list) return;

    list.innerHTML = "";

    if (modellingProgress.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>🌟 No progress recorded yet.</p>
            </div>
        `;

        return;
    }

    modellingProgress.forEach((item, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>🌟 ${item.text}</h3>

                <p>Date: ${item.date}</p>

                <button onclick="deleteProgress(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deleteProgress(index) {

    modellingProgress.splice(index, 1);

    saveData(
        "bibiModellingProgress",
        modellingProgress
    );

    displayProgress();
}


/* =====================================================
   NOTES
===================================================== */

let notes = getData("bibiNotes");


function addNote() {

    const title =
        document.getElementById("noteTitle");

    const text =
        document.getElementById("noteText");

    if (!title || !text) return;

    const noteTitle = title.value.trim();
    const noteText = text.value.trim();

    if (noteTitle === "" || noteText === "") {

        alert("Please enter a title and your note.");

        return;
    }

    notes.push({
        title: noteTitle,
        text: noteText,
        date: new Date().toLocaleDateString()
    });

    saveData("bibiNotes", notes);

    title.value = "";
    text.value = "";

    displayNotes();
}


function displayNotes() {

    const list =
        document.getElementById("notesList");

    if (!list) return;

    list.innerHTML = "";

    if (notes.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>🗒️ No notes saved yet.</p>
            </div>
        `;

        return;
    }

    notes.forEach((note, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>🗒️ ${note.title}</h3>

                <p>${note.text}</p>

                <small>Saved: ${note.date}</small>

                <br><br>

                <button onclick="deleteNote(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deleteNote(index) {

    notes.splice(index, 1);

    saveData("bibiNotes", notes);

    displayNotes();
}


/* =====================================================
   CALENDAR
===================================================== */

let calendarEvents = getData("bibiCalendarEvents");


function addCalendarEvent() {

    const date =
        document.getElementById("calendarDate");

    const title =
        document.getElementById("calendarEvent");

    if (!date || !title) return;

    const eventDate = date.value;
    const eventTitle = title.value.trim();

    if (eventDate === "" || eventTitle === "") {

        alert("Please enter a date and event.");

        return;
    }

    calendarEvents.push({
        date: eventDate,
        event: eventTitle
    });

    saveData(
        "bibiCalendarEvents",
        calendarEvents
    );

    title.value = "";

    displayCalendarEvents();
}


function displayCalendarEvents() {

    const list =
        document.getElementById("calendarEventList");

    if (!list) return;

    list.innerHTML = "";

    if (calendarEvents.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>📅 No calendar events yet.</p>
            </div>
        `;

        return;
    }

    calendarEvents
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date))
        .forEach((item) => {

            const originalIndex =
                calendarEvents.indexOf(item);

            list.innerHTML += `
                <div class="list-item">

                    <h3>📅 ${item.event}</h3>

                    <p>Date: ${item.date}</p>

                    <button onclick="deleteCalendarEvent(${originalIndex})">
                        Delete
                    </button>

                </div>
            `;
        });
}


function deleteCalendarEvent(index) {

    calendarEvents.splice(index, 1);

    saveData(
        "bibiCalendarEvents",
        calendarEvents
    );

    displayCalendarEvents();
}


/* =====================================================
   PERIOD TRACKER
===================================================== */

let periodRecords =
    getData("bibiPeriodRecords");


function addPeriodRecord() {

    const date =
        document.getElementById("periodDate");

    if (!date) return;

    const periodDate = date.value;

    if (periodDate === "") {

        alert("Please select the date your period started.");

        return;
    }

    periodRecords.push({
        startDate: periodDate
    });

    saveData(
        "bibiPeriodRecords",
        periodRecords
    );

    date.value = "";

    displayPeriodRecords();
}


function displayPeriodRecords() {

    const list =
        document.getElementById("periodList");

    if (!list) return;

    list.innerHTML = "";

    if (periodRecords.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>🩷 No period dates recorded yet.</p>
            </div>
        `;

        return;
    }

    periodRecords.forEach((record, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>🩷 Period Started</h3>

                <p>${record.startDate}</p>

                <button onclick="deletePeriodRecord(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deletePeriodRecord(index) {

    periodRecords.splice(index, 1);

    saveData(
        "bibiPeriodRecords",
        periodRecords
    );

    displayPeriodRecords();
}


/* =====================================================
   EMAIL & CONTENT STORAGE
===================================================== */

let savedContent =
    getData("bibiSavedContent");


function saveEmailContent() {

    const title =
        document.getElementById("savedContentTitle");

    const text =
        document.getElementById("savedContentText");

    const email =
        document.getElementById("savedEmail");

    if (!title || !text) return;

    const savedTitle = title.value.trim();
    const savedText = text.value.trim();
    const savedEmail = email ? email.value.trim() : "";

    if (savedTitle === "" && savedText === "") {

        alert("Please enter something to save.");

        return;
    }

    savedContent.push({
        title: savedTitle || "Untitled",
        text: savedText,
        email: savedEmail,
        date: new Date().toLocaleDateString()
    });

    saveData(
        "bibiSavedContent",
        savedContent
    );

    title.value = "";
    text.value = "";

    if (email) {
        email.value = "";
    }

    displaySavedContent();
}


function displaySavedContent() {

    const list =
        document.getElementById("savedContentList");

    if (!list) return;

    list.innerHTML = "";

    if (savedContent.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>✉️ No saved content yet.</p>
            </div>
        `;

        return;
    }

    savedContent.forEach((item, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>✉️ ${item.title}</h3>

                ${
                    item.email
                    ? `<p>Email: ${item.email}</p>`
                    : ""
                }

                <p>${item.text}</p>

                <small>Saved: ${item.date}</small>

                <br><br>

                <button onclick="deleteSavedContent(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deleteSavedContent(index) {

    savedContent.splice(index, 1);

    saveData(
        "bibiSavedContent",
        savedContent
    );

    displaySavedContent();
}


/* =====================================================
   IMAGE STORAGE
===================================================== */

let savedImages = getData("bibiSavedImages");


function saveImage() {

    const input =
        document.getElementById("imageInput");

    const title =
        document.getElementById("imageTitle");

    if (!input || !title) return;

    const file = input.files[0];

    if (!file) {

        alert("Please choose an image.");

        return;
    }

    if (!file.type.startsWith("image/")) {

        alert("Please choose an image file.");

        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {

        savedImages.push({
            title: title.value.trim() || "Saved Image",
            image: event.target.result,
            date: new Date().toLocaleDateString()
        });

        saveData(
            "bibiSavedImages",
            savedImages
        );

        title.value = "";
        input.value = "";

        displaySavedImages();
    };

    reader.readAsDataURL(file);
}


function displaySavedImages() {

    const list =
        document.getElementById("savedImagesList");

    if (!list) return;

    list.innerHTML = "";

    if (savedImages.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>🖼️ No images saved yet.</p>
            </div>
        `;

        return;
    }

    savedImages.forEach((item, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>🖼️ ${item.title}</h3>

                <img
                    src="${item.image}"
                    alt="${item.title}"
                    style="
                        max-width:100%;
                        border-radius:15px;
                        margin:10px 0;
                    "
                >

                <p>Saved: ${item.date}</p>

                <button onclick="deleteSavedImage(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


function deleteSavedImage(index) {

    savedImages.splice(index, 1);

    saveData(
        "bibiSavedImages",
        savedImages
    );

    displaySavedImages();
}


/* =====================================================
   DAILY STREAK
===================================================== */

let streakData =
    JSON.parse(localStorage.getItem("bibiStreak")) || {
        count: 0,
        lastDate: null
    };


function updateDailyStreak() {

    const today =
        new Date().toISOString().split("T")[0];

    if (streakData.lastDate === today) {

        displayStreak();

        return;
    }

    if (streakData.lastDate) {

        const last =
            new Date(streakData.lastDate);

        const current =
            new Date(today);

        const difference =
            Math.floor(
                (current - last) /
                (1000 * 60 * 60 * 24)
            );

        if (difference === 1) {

            streakData.count++;

        } else if (difference > 1) {

            streakData.count = 1;

        }

    } else {

        streakData.count = 1;
    }

    streakData.lastDate = today;

    localStorage.setItem(
        "bibiStreak",
        JSON.stringify(streakData)
    );

    displayStreak();
}


function displayStreak() {

    const streakNumber =
        document.getElementById("streakNumber");

    const streakText =
        document.getElementById("streakText");

    if (streakNumber) {
        streakNumber.textContent =
            streakData.count;
    }

    if (streakText) {

        if (streakData.count === 1) {

            streakText.textContent =
                "day streak 🔥";

        } else {

            streakText.textContent =
                "days streak 🔥";
        }
    }
}


/* =====================================================
   LOAD EVERYTHING
===================================================== */

document.addEventListener("DOMContentLoaded", function() {

    /* Business */

    displayProducts();
    displayOrders();
    displayTransactions();
    displayBusinessGoals();


    /* Content */

    displayContentIdeas();
    displayPlannedContent();
    displayCampaigns();
    displayPostedContent();


    /* Modelling */

    displayPortfolioIdeas();
    displayOpportunities();
    displayProfessionalGoals();
    displayProgress();


    /* Notes */

    displayNotes();


    /* Calendar */

    displayCalendarEvents();


    /* Period */

    displayPeriodRecords();


    /* Saved Content */

    displaySavedContent();


    /* Images */

    displaySavedImages();


    /* Streak */

    displayStreak();

});


/* =====================================================
   START DAILY STREAK WHEN PAGE IS OPENED
===================================================== */

updateDailyStreak();
/* =====================================================
   BIBI HUB — NEW FEATURES
===================================================== */


/* =====================================================
   🗒️ NOTES
===================================================== */

let bibiNotes =
    JSON.parse(localStorage.getItem("bibiNotes")) || [];


function addNote() {

    const titleInput =
        document.getElementById("noteTitle");

    const textInput =
        document.getElementById("noteText");

    if (!titleInput || !textInput) return;

    const title = titleInput.value.trim();
    const text = textInput.value.trim();

    if (title === "" || text === "") {

        alert("📝 Please enter a note title and your note.");

        return;
    }

    bibiNotes.push({

        title: title,

        text: text,

        date: new Date().toLocaleDateString()

    });

    localStorage.setItem(
        "bibiNotes",
        JSON.stringify(bibiNotes)
    );

    titleInput.value = "";
    textInput.value = "";

    displayNotes();
}


function displayNotes() {

    const list =
        document.getElementById("notesList");

    if (!list) return;

    list.innerHTML = "";

    if (bibiNotes.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>📝 No notes saved yet.</p>
            </div>
        `;

        return;
    }

    bibiNotes.forEach((note, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>📝 ${note.title}</h3>

                <p>${note.text}</p>

                <small>
                    📅 ${note.date}
                </small>

                <br><br>

                <button onclick="deleteNote(${index})">
                    🗑️ Delete
                </button>

            </div>
        `;

    });
}


function deleteNote(index) {

    bibiNotes.splice(index, 1);

    localStorage.setItem(
        "bibiNotes",
        JSON.stringify(bibiNotes)
    );

    displayNotes();
}



/* =====================================================
   📅 CALENDAR
===================================================== */

let bibiCalendarEvents =
    JSON.parse(localStorage.getItem("bibiCalendarEvents")) || [];


function addCalendarEvent() {

    const dateInput =
        document.getElementById("calendarDate");

    const titleInput =
        document.getElementById("calendarTitle");

    const detailsInput =
        document.getElementById("calendarDetails");

    if (!dateInput || !titleInput || !detailsInput) return;

    const date = dateInput.value;
    const title = titleInput.value.trim();
    const details = detailsInput.value.trim();

    if (date === "" || title === "") {

        alert("📅 Please choose a date and enter an event.");

        return;
    }

    bibiCalendarEvents.push({

        date: date,

        title: title,

        details: details

    });

    localStorage.setItem(
        "bibiCalendarEvents",
        JSON.stringify(bibiCalendarEvents)
    );

    dateInput.value = "";
    titleInput.value = "";
    detailsInput.value = "";

    displayCalendarEvents();
}


function displayCalendarEvents() {

    const list =
        document.getElementById("calendarEventList");

    if (!list) return;

    list.innerHTML = "";

    if (bibiCalendarEvents.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>📅 No calendar events yet.</p>
            </div>
        `;

        return;
    }

    bibiCalendarEvents.forEach((event, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>📅 ${event.title}</h3>

                <p>
                    <strong>Date:</strong>
                    ${event.date}
                </p>

                ${
                    event.details
                    ? `<p>${event.details}</p>`
                    : ""
                }

                <button onclick="deleteCalendarEvent(${index})">
                    🗑️ Delete
                </button>

            </div>
        `;

    });
}


function deleteCalendarEvent(index) {

    bibiCalendarEvents.splice(index, 1);

    localStorage.setItem(
        "bibiCalendarEvents",
        JSON.stringify(bibiCalendarEvents)
    );

    displayCalendarEvents();
}



/* =====================================================
   🌸 PERIOD TRACKER
===================================================== */

let periodRecords =
    JSON.parse(localStorage.getItem("bibiPeriodRecords")) || [];


function savePeriod() {

    const startDateInput =
        document.getElementById("periodStart");

    const endDateInput =
        document.getElementById("periodEnd");

    if (!startDateInput) return;

    const startDate =
        startDateInput.value;

    const endDate =
        endDateInput
            ? endDateInput.value
            : "";

    if (startDate === "") {

        alert("🌸 Please choose your period start date.");

        return;
    }

    periodRecords.push({

        start: startDate,

        end: endDate

    });

    localStorage.setItem(
        "bibiPeriodRecords",
        JSON.stringify(periodRecords)
    );

    startDateInput.value = "";

    if (endDateInput) {
        endDateInput.value = "";
    }

    displayPeriods();
}


function displayPeriods() {

    const list =
        document.getElementById("periodList");

    if (!list) return;

    list.innerHTML = "";

    if (periodRecords.length === 0) {

        list.innerHTML = `
            <div class="list-item">
                <p>🌸 No period records yet.</p>
            </div>
        `;

        return;
    }

    periodRecords.forEach((period, index) => {

        list.innerHTML += `
            <div class="list-item">

                <h3>🌸 Period Record</h3>

                <p>
                    <strong>Start:</strong>
                    ${period.start}
                </p>

                ${
                    period.end
                    ? `<p><strong>End:</strong> ${period.end}</p>`
                    : ""
                }

                <button onclick="deletePeriod(${index})">
                    🗑️ Delete
                </button>

            </div>
        `;

    });
}


function deletePeriod(index) {

    periodRecords.splice(index, 1);

    localStorage.setItem(
        "bibiPeriodRecords",
        JSON.stringify(periodRecords)
    );

    displayPeriods();
}



/* =====================================================
   🔥 DAILY STREAK
===================================================== */

let streakData =
    JSON.parse(localStorage.getItem("bibiStreakData")) || {

        count: 0,

        lastDate: null

    };


function updateStreak() {

    const today =
        new Date().toISOString().split("T")[0];

    if (streakData.lastDate === today) {

        alert("🔥 You already checked in today!");

        displayStreak();

        return;
    }


    if (streakData.lastDate) {

        const last =
            new Date(streakData.lastDate);

        const current =
            new Date(today);

        const difference =
            Math.floor(
                (current - last) /
                (1000 * 60 * 60 * 24)
            );


        if (difference === 1) {

            streakData.count++;

        } else {

            streakData.count = 1;

        }

    } else {

        streakData.count = 1;

    }


    streakData.lastDate = today;


    localStorage.setItem(
        "bibiStreakData",
        JSON.stringify(streakData)
    );


    displayStreak();
}


function displayStreak() {

    const streakNumber =
        document.getElementById("streakNumber");

    const streakMessage =
        document.getElementById("streakMessage");


    if (streakNumber) {

        streakNumber.textContent =
            streakData.count;

    }


    if (streakMessage) {

        if (streakData.count === 0) {

            streakMessage.textContent =
                "Start your streak today! 💕";

        } else if (streakData.count === 1) {

            streakMessage.textContent =
                "Day 1! Keep going! 🌸";

        } else {

            streakMessage.textContent =
                `Amazing! You are on a ${streakData.count} day streak! 🔥`;

        }

    }

}



/* =====================================================
   💾 GOOGLE DRIVE
===================================================== */

const bibiDriveLink =
    "https://drive.google.com/drive/folders/16nlxSHbQH2IbtkmoWofu2yIr9N4zR38X?usp=drive_link";


function openBibiDrive() {

    window.open(
        bibiDriveLink,
        "_blank"
    );

}



/* =====================================================
   😊 LITTLE WELCOME MESSAGE
===================================================== */

function bibiHello() {

    const messages = [

        "💕 You’ve got this, Bibi!",

        "✨ Keep building your dream!",

        "🌸 One step at a time!",

        "💅 Main character energy!",

        "🔥 Look at you making progress!",

        "🖤 Pink, pretty and productive!",

        "🥰 Welcome back, Bibi!",

        "🎀 Make today count!"

    ];

    const randomMessage =
        messages[
            Math.floor(
                Math.random() * messages.length
            )
        ];

    alert(randomMessage);
}



/* =====================================================
   LOAD NEW FEATURES
===================================================== */

displayNotes();

displayCalendarEvents();

displayPeriods();

displayStreak();
/* =====================================================
   🖼️ BIBI BACKGROUND SLIDESHOW
===================================================== */

let bibiSlides = [];
let bibiCurrentSlide = 0;


function startBibiSlideshow() {

    bibiSlides =
        document.querySelectorAll(".bg-slide");

    if (!bibiSlides.length) {
        console.log("No slideshow images found.");
        return;
    }

    bibiSlides.forEach((slide, index) => {

        slide.classList.remove("active");

        slide.onerror = function() {
            console.log(
                "Could not load:",
                slide.src
            );
        };

    });

    bibiSlides[0].classList.add("active");

    setInterval(() => {

        bibiSlides[bibiCurrentSlide]
            .classList.remove("active");

        bibiCurrentSlide++;

        if (bibiCurrentSlide >= bibiSlides.length) {
            bibiCurrentSlide = 0;
        }

        bibiSlides[bibiCurrentSlide]
            .classList.add("active");

    }, 5000);
}


document.addEventListener(
    "DOMContentLoaded",
    startBibiSlideshow
);