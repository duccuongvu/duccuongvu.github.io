document.addEventListener("DOMContentLoaded", function () {
function calculateDuration(start, end) {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
    }
    if (months < 0) {
    months += 12;
    years--;
    }
    return { years, months, days };
}

function updateDurations() {
    document.querySelectorAll('.edu-date, .work-date, .project-date').forEach(el => {
    const startDate = new Date(el.dataset.start);
    const endDate = (el.dataset.end && el.dataset.end.toLowerCase() !== 'present') 
                    ? new Date(el.dataset.end) 
                    : new Date();
    const duration = calculateDuration(startDate, endDate);

    // Chỉ thêm một lần
    if (!el.textContent.includes("(")) {
        el.textContent += ` (${duration.years} years, ${duration.months} months, ${duration.days} days)`;
    }
    });
}

updateDurations();
setInterval(updateDurations, 24 * 60 * 60 * 1000);
});