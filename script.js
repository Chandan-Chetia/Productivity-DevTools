document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeBtns = document.querySelectorAll('.close-btn');
    
    // Open modals
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
    
    signupBtn.addEventListener('click', () => {
        signupModal.classList.add('active');
    });
    
    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.classList.remove('active');
            signupModal.classList.remove('active');
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === signupModal) {
            signupModal.classList.remove('active');
        }
    });
    
    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login functionality would be implemented here');
        loginModal.classList.remove('active');
    });
    
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Signup functionality would be implemented here');
        signupModal.classList.remove('active');
    });
    
    // Task manager functionality
    const taskCheckboxes = document.querySelectorAll('.task-checkbox-3d');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            this.closest('.task-item-3d').classList.toggle('completed');
            updateProgressBar();
        });
    });
    
    function updateProgressBar() {
        const totalTasks = document.querySelectorAll('.task-item-3d').length;
        const completedTasks = document.querySelectorAll('.task-item-3d.completed').length;
        const progress = Math.round((completedTasks / totalTasks) * 100);
        
        document.querySelector('.progress-fill-3d').style.width = `${progress}%`;
        document.querySelector('.progress-label').textContent = `${progress}% Complete`;
    }
    
    // Pomodoro timer functionality
    let pomodoroInterval;
    let minutes = 25;
    let seconds = 0;
    let isRunning = false;
    
    const timerDisplay = document.querySelector('.pomodoro-display-3d .timer');
    const startBtn = document.querySelector('.pomodoro-controls .btn-success-3d');
    const resetBtn = document.querySelector('.pomodoro-controls .btn-danger-3d');
    
    function updateTimerDisplay() {
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            startBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            
            pomodoroInterval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(pomodoroInterval);
                        isRunning = false;
                        startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
                        alert('Pomodoro session completed!');
                        return;
                    }
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                updateTimerDisplay();
            }, 1000);
        } else {
            clearInterval(pomodoroInterval);
            isRunning = false;
            startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        }
    });
    
    resetBtn.addEventListener('click', () => {
        clearInterval(pomodoroInterval);
        isRunning = false;
        minutes = 25;
        seconds = 0;
        updateTimerDisplay();
        startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    });
    
    // Initialize timer display
    updateTimerDisplay();
    
    // Markdown editor - simple preview update
    const markdownTextarea = document.querySelector('.editor-textarea');
    const markdownPreview = document.querySelector('.markdown-preview');
    
    markdownTextarea.addEventListener('input', () => {
        // In a real app, you would use a proper markdown parser like marked.js
        const text = markdownTextarea.value;
        
        // Simple transformations for demo purposes
        let html = text
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
            .replace(/\n/g, '<br>');
        
        // Wrap list items in ul
        if (html.includes('<li>')) {
            html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
        }
        
        markdownPreview.innerHTML = html;
        
        // Update word count
        const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        document.querySelector('.word-count').textContent = `Words: ${wordCount}`;
    });
    
    // Initialize markdown preview
    markdownTextarea.dispatchEvent(new Event('input'));
    
    // JSON viewer - simple syntax highlighting
    const jsonInput = document.querySelector('.json-input');
    const jsonViewer = document.querySelector('.json-viewer');
    
    jsonInput.addEventListener('input', () => {
        try {
            const json = JSON.parse(jsonInput.value);
            jsonViewer.textContent = JSON.stringify(json, null, 2);
            
            // Simple syntax highlighting
            jsonViewer.innerHTML = jsonViewer.innerHTML
                .replace(/"(\w+)":/g, '<span class="json-key">"$1"</span><span class="json-colon">:</span>')
                .replace(/"([^"]+)"/g, '<span class="json-string">"$1"</span>')
                .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>')
                .replace(/\b(null)\b/g, '<span class="json-null">$1</span>')
                .replace(/\b(\d+\.?\d*)\b/g, '<span class="json-number">$1</span>')
                .replace(/{|}/g, '<span class="json-brace">$&</span>')
                .replace(/\[|\]/g, '<span class="json-bracket">$&</span>')
                .replace(/,/g, '<span class="json-comma">$&</span>');
        } catch (e) {
            jsonViewer.textContent = 'Invalid JSON';
        }
    });
    
    // Initialize JSON viewer
    jsonInput.dispatchEvent(new Event('input'));
    
    // Regex tester
    const regexPattern = document.querySelector('.regex-pattern');
    const regexTestString = document.querySelector('.regex-test-string');
    const regexHighlightedText = document.querySelector('.regex-highlighted-text');
    const regexMatchCount = document.querySelector('.regex-match-count');
    const regexFlags = document.querySelectorAll('.regex-flags button');
    
    function testRegex() {
        try {
            let flags = '';
            regexFlags.forEach(btn => {
                if (btn.classList.contains('active')) {
                    flags += btn.textContent.trim();
                }
            });
            
            const pattern = new RegExp(regexPattern.value, flags);
            const testString = regexTestString.value;
            const matches = testString.match(pattern) || [];
            
            // Highlight matches
            let highlighted = testString;
            if (pattern.source) {
                highlighted = testString.replace(pattern, match => 
                    `<span class="regex-match">${match}</span>`
                );
            }
            
            regexHighlightedText.innerHTML = highlighted;
            regexMatchCount.textContent = `${matches.length} matches found`;
            
            if (matches.length > 0) {
                regexMatchCount.style.color = 'var(--success)';
            } else {
                regexMatchCount.style.color = 'var(--danger)';
            }
        } catch (e) {
            regexHighlightedText.textContent = 'Invalid regular expression';
            regexMatchCount.textContent = '0 matches found';
            regexMatchCount.style.color = 'var(--danger)';
        }
    }
    
    regexPattern.addEventListener('input', testRegex);
    regexTestString.addEventListener('input', testRegex);
    
    regexFlags.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-check-circle');
            this.querySelector('i').classList.toggle('fa-circle');
            testRegex();
        });
    });
    
    // Initialize regex tester
    testRegex();
    
    // Add note functionality
    const addNoteBtn = document.querySelector('.notes-card .btn-icon-3d');
    const notesGrid = document.querySelector('.notes-grid');
    const noteColors = ['yellow', 'blue', 'green', 'pink'];
    
    addNoteBtn.addEventListener('click', function() {
        const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
        const noteHTML = `
            <div class="note-3d ${randomColor}">
                <textarea placeholder="Start typing..."></textarea>
                <div class="note-footer">
                    <div class="note-date">Just now</div>
                    <button class="btn-icon-3d small"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        
        notesGrid.insertAdjacentHTML('afterbegin', noteHTML);
        
        // Add event listener to new delete button
        const deleteBtn = notesGrid.querySelector('.note-3d:first-child .btn-icon-3d');
        deleteBtn.addEventListener('click', function() {
            this.closest('.note-3d').remove();
        });
    });
    
    // Add event listeners to existing delete buttons
    document.querySelectorAll('.note-3d .btn-icon-3d').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.note-3d').remove();
        });
    });
    
    // Add task functionality
    const taskInput = document.querySelector('.task-input-3d input');
    const addTaskBtn = document.querySelector('.task-input-3d button');
    
    addTaskBtn.addEventListener('click', function() {
        if (taskInput.value.trim() === '') return;
        
        const taskList = document.querySelector('.task-list-3d');
        const taskHTML = `
            <li class="task-item-3d">
                <div class="task-checkbox-3d"></div>
                <div class="task-content">
                    <span>${taskInput.value}</span>
                    <span class="priority-badge medium">Medium</span>
                </div>
            </li>
        `;
        
        taskList.insertAdjacentHTML('beforeend', taskHTML);
        taskInput.value = '';
        
        // Add event listener to new checkbox
        const newCheckbox = taskList.lastElementChild.querySelector('.task-checkbox-3d');
        newCheckbox.addEventListener('click', function() {
            this.closest('.task-item-3d').classList.toggle('completed');
            updateProgressBar();
        });
    });
    
    // Allow pressing Enter to add task
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
    
    // Add snippet functionality
    const addSnippetBtn = document.querySelector('.snippet-item-3d .btn-icon-3d');
    const snippetList = document.querySelector('.snippet-list-3d');
    
    addSnippetBtn.addEventListener('click', function() {
        const snippetHTML = `
            <div class="snippet-item-3d">
                <div class="snippet-header">
                    <h4>New Snippet</h4>
                    <span class="lang-badge js">JS</span>
                </div>
                <div class="snippet-preview">
                    <code>// Add your code here</code>
                </div>
                <div class="snippet-actions">
                    <button class="btn-icon-3d small"><i class="fas fa-copy"></i></button>
                    <button class="btn-icon-3d small"><i class="fas fa-edit"></i></button>
                </div>
            </div>
        `;
        
        snippetList.insertAdjacentHTML('afterbegin', snippetHTML);
    });
    
    // Calendar navigation
    const calendarPrevBtn = document.querySelector('.calendar-card .btn-icon-3d:first-child');
    const calendarNextBtn = document.querySelector('.calendar-card .btn-icon-3d:last-child');
    const currentWeekDisplay = document.querySelector('.current-week');
    
    let currentWeekStart = new Date(2023, 4, 15); // May 15, 2023
    
    function updateCalendarDisplay() {
        const weekStart = new Date(currentWeekStart);
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        const options = { month: 'short', day: 'numeric' };
        currentWeekDisplay.textContent = 
            `${weekStart.toLocaleDateString('en-US', options)} - ${weekEnd.toLocaleDateString('en-US', options)}, ${weekStart.getFullYear()}`;
    }
    
    calendarPrevBtn.addEventListener('click', function() {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        updateCalendarDisplay();
    });
    
    calendarNextBtn.addEventListener('click', function() {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        updateCalendarDisplay();
    });
    
    // Initialize calendar
    updateCalendarDisplay();
});