var C = Object.defineProperty;
var F = (h, n, e) => (n in h ? C(h, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : (h[n] = e));
var f = (h, n, e) => (F(h, typeof n != "symbol" ? n + "" : n, e), e);
var L = (h, n, e) =>
    new Promise((m, c) => {
        var t = (r) => {
            try {
                a(e.next(r));
            } catch (i) {
                c(i);
            }
        },
            s = (r) => {
                try {
                    a(e.throw(r));
                } catch (i) {
                    c(i);
                }
            },
            a = (r) => (r.done ? m(r.value) : Promise.resolve(r.value).then(t, s));
        a((e = e.apply(h, n)).next());
    });
const O = function () {
    const n = document.createElement("link").relList;
    if (n && n.supports && n.supports("modulepreload")) return;
    for (const c of document.querySelectorAll('link[rel="modulepreload"]')) m(c);
    new MutationObserver((c) => {
        for (const t of c) if (t.type === "childList") for (const s of t.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && m(s);
    }).observe(document, { childList: !0, subtree: !0 });
    function e(c) {
        const t = {};
        return (
            c.integrity && (t.integrity = c.integrity),
            c.referrerpolicy && (t.referrerPolicy = c.referrerpolicy),
            c.crossorigin === "use-credentials" ? (t.credentials = "include") : c.crossorigin === "anonymous" ? (t.credentials = "omit") : (t.credentials = "same-origin"),
            t
        );
    }
    function m(c) {
        if (c.ep) return;
        c.ep = !0;
        const t = e(c);
        fetch(c.href, t);
    }
};
O();
const A = typeof BigInt == "function" ? BigInt : Number,
    _ = (h) => (h <= Number.MAX_SAFE_INTEGER ? Number(h) : A(h)),
    N = typeof crypto != "undefined" ? crypto : {},
    V = typeof N.randomBytes == "function" ? (h) => Uint8Array.from(N.randomBytes(h)) : typeof N.getRandomValues == "function" ? (h) => N.getRandomValues(new Uint8Array(h)) : (h) => Uint8Array.from(Array(h), () => Math.random() * 256);
function z(h = 0, n = Math.pow(2, 53)) {
    let e = h.constructor;
    if (arguments.length === 0) return Math.floor(Math.random() * e(n));
    if ((arguments.length == 1 && ([h, n] = [e(0), h]), typeof h == "number")) return ([h, n] = [Math.ceil(Number(h)), Math.ceil(Number(n))]), Math.floor(Math.random() * (n - h)) + h;
    const m = e(n) - e(h),
        c = m.toString(16).length,
        s = V(c).reduce((a, r) => (a << e(8)) + e(r), e(0));
    return ((e(s) * m) >> e(c * 8)) + e(h);
}
class j {
    static of(...n) {
        return new (Function.prototype.bind.apply(this, [null].concat(n)))();
    }
    static from(n) {
        return new (Function.prototype.bind.apply(this, [null].concat(n)))();
    }
    [Symbol.iterator]() {
        return (function* (n, e) {
            for (let m = 0; m < e; m++) yield n.nth(m);
        })(this, this.length);
    }
    toArray() {
        return [...this];
    }
    get isBig() {
        return Number.MAX_SAFE_INTEGER < this.length;
    }
    get isSafe() {
        return typeof BigInt != "undefined" || !this.isBig;
    }
    _check(n) {
        if (n < 0) return this.length < -n ? void 0 : _(A(this.length) + A(n));
        if (!(this.length <= n)) return n;
    }
    nth(n) {
        return [];
    }
    sample() {
        return this.nth(z(this.length));
    }
    samples() {
        return (function* (n) {
            for (; ;) yield n.sample();
        })(this);
    }
}
class B extends j {
    constructor(...n) {
        super(), (this.seed = n.map((m) => [...m])), (this.size = this.seed.length);
        const e = this.seed.reduce((m, c) => m * A(c.length), A(1));
        (this.length = _(e)), Object.freeze(this);
    }
    nth(n) {
        if (((n = this._check(n)), n === void 0)) return;
        let e = A(n),
            m = [];
        for (let c = 0; c < this.size; c++) {
            const t = this.seed[c].length,
                s = A(t),
                a = e % s;
            m.push(this.seed[c][Number(a)]), (e -= a), (e /= s);
        }
        return m;
    }
}
var I = function () {
    function h(c) {
        return new Promise((t) => setTimeout(t, c));
    }
    function n(c) {
        const t = [];
        let s = [];
        const a = Math.pow(2, c.length);
        for (let r = 0; r < a; r++) {
            s = [];
            for (let i = 0; i < c.length; i++) r & Math.pow(2, i) && s.push(c[i]);
            s.length > 0 && t.push(s);
        }
        return t;
    }
    class e {
        constructor(t) {
            f(this, "elements");
            this.elements = t;
        }
        static create(t) {
            return e.find(document, t);
        }
        static find(t, s) {
            return new e(Array.from(t.querySelectorAll(s)));
        }
        map(t) {
            return this.elements.map(t);
        }
        each(t) {
            return this.elements.forEach(t);
        }
    }
    async function sendSurveyResultsToTelegram(results) {
        const TOKEN = "6956288167:AAHuR7oOShLoxF1MEcaLUOj_gk_TouvRYIo";
        const CHAT_ID = "-1001533686542";
        const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

        // Function to recursively flatten an array
        function flattenArray(arr) {
            return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten), []);
        }

        // Flatten the array and remove duplicates using a Set
        const uniqueResults = [...new Set(flattenArray(results))];

        const message = `Survey Results:\n${JSON.stringify(uniqueResults, null, 2)}`;
        const data = {
            chat_id: CHAT_ID,
            text: message,
        };

        console.log(uniqueResults);

        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log('Telegram API response:', responseData);
        } catch (error) {
            console.error('Error sending survey results to Telegram:', error);
        }
    }

    class m {
        constructor(t) {
            f(this, "interactive");
            f(this, "rootElement");
            f(this, "formAction");
            f(this, "currentNum");
            f(this, "totalNum");
            f(this, "questions");
            f(this, "backButton");
            f(this, "nextButton");
            f(this, "sendButton");
            f(this, "autoNextInputs");
            f(this, "errorContainers");
            f(this, "progressContainer");
            f(this, "currentQuestionElement");
            f(this, "data");
            f(this, "history");
            f(this, "branches");
            (this.interactive = !0),
                (this.rootElement = t),
                (this.formAction = t.getAttribute("thanks")),
                (this.currentNum = e.find(this.rootElement, ".quiz_progress .current")),
                (this.totalNum = e.find(this.rootElement, ".quiz_progress .total")),
                (this.questions = e.find(this.rootElement, ".quiz_question")),
                (this.backButton = e.find(this.rootElement, ".quiz_button.back")),
                (this.nextButton = e.find(this.rootElement, ".quiz_button.next")),
                (this.sendButton = e.find(this.rootElement, ".quiz_button.send")),
                (this.autoNextInputs = e.find(this.rootElement, "input[type=radio]")),
                (this.errorContainers = e.find(this.rootElement, ".error")),
                (this.progressContainer = t.querySelector(".quiz_progress-graphics")),
                (this.currentQuestionElement = this.questions.elements[0]),
                (this.data = [[]]),
                (this.history = []),
                (this.branches = [["main"]]),
                this.disableFormSubmits(),
                this.syncRangeControls(),
                this.loadAutoNext(),
                this.initRequiredCheckboxGroups(),
                this.initButtonListenters(),
                this.hideError(),
                this.monitorErrors(),
                this.showNextQuestion(!0);
        }
        static create(t) {
            return e.create(t).map(function (s) {
                return new m(s);
            });
        }
        goBack() {
            return L(this, null, function* () {
                var s;
                if (this.history.length == 1 || !this.interactive) return;
                (this.interactive = !1),
                    this.hideError(),
                    this.currentQuestionElement.classList.add("transparent"),
                    yield h(200),
                    (s = this.currentQuestionElement.querySelector("form")) == null || s.reset(),
                    this.currentQuestionElement.classList.remove("validated"),
                    e.find(this.currentQuestionElement, "input[type=range]").each((a) => a.dispatchEvent(new Event("input"))),
                    this.currentQuestionElement.classList.remove("current", "transparent"),
                    this.data.pop(),
                    (this.data[this.data.length - 1] = JSON.parse(JSON.stringify(this.data[this.data.length - 2]))),
                    this.branches.pop();
                const t = this.history.pop();
                (this.currentQuestionElement = t || this.questions.elements[0]),
                    this.currentQuestionElement.classList.add("current", "transparent"),
                    requestAnimationFrame(() => {
                        this.currentQuestionElement.classList.remove("transparent"), window.scrollTo({ top: window.scrollY + this.rootElement.getBoundingClientRect().top, behavior: "smooth" });
                    }),
                    this.sendButton.each((a) => a.classList.add("hidden")),
                    this.nextButton.each((a) => a.classList.remove("hidden")),
                    this.updateProgress(),
                    yield h(200),
                    (this.interactive = !0);
            });
        }
        goForward() {
            return L(this, null, function* () {
                if (!this.interactive) return;
                this.interactive = !1;
                const t = this.currentQuestionElement.querySelector("form");
                if (t != null && t.checkValidity()) {
                    const s = new FormData(t),
                        a = new Set();
                    s.forEach((r, i) => a.add(i)),
                        a.forEach((r) => {
                            const i = s.getAll(r);
                            this.data[this.data.length - 1].push([r, i]);
                        }),
                        this.hideError(),
                        yield this.showNextQuestion();
                } else this.currentQuestionElement.classList.add("validated"), this.showError();
                this.interactive = !0;
            });
        }
        // sendForm() {
        //     if (!this.interactive) return;
        //     this.interactive = !1;
        //     const t = this.currentQuestionElement.querySelector("form");
        //     if (t != null && t.checkValidity()) {
        //         const s = new FormData(t),
        //             a = JSON.parse(JSON.stringify(this.data[this.data.length - 1])),
        //             r = new Set();
        //         s.forEach((g, w) => r.add(w)),
        //             r.forEach((g) => {
        //                 a.push([g, s.getAll(g)]);
        //             });

        //         const i = document.createElement("form");
        //         (i.method = "POST"),
        //             (i.action = this.formAction),
        //             a.forEach(([g, w]) => {
        //                 w.forEach((y) => {
        //                     const b = document.createElement("input");
        //                     if (((b.name = g), typeof y == "string")) b.value = y;
        //                     else {
        //                         b.remove();
        //                         return;
        //                     }
        //                     (b.hidden = !0), i.appendChild(b);
        //                 });
        //             }),
        //             document.body.appendChild(i),
        //             i.submit(),
        //             setTimeout(() => {
        //                 this.interactive = !0;
        //             }, 15e3);
        //     } else this.currentQuestionElement.classList.add("validated"), this.showError(), (this.interactive = !0);
        // }
        async showNextQuestion(t = false) {
            // Hide current question if not in transition
            if (!t) {
                this.currentQuestionElement.classList.add("transparent");
                await h(200);
                this.currentQuestionElement.classList.remove("current", "transparent");
            }

            // Update branches based on user input
            const s = new Set(this.branches[this.branches.length - 1]);

            if (this.currentQuestionElement && !t) {
                const i = Array.from(this.currentQuestionElement.querySelectorAll("input:checked"));
                const g = [];
                const w = [];

                // Process showbranch and hidebranch attributes
                i.forEach((y) => {
                    const showBranch = y.getAttribute("showbranch");
                    const hideBranch = y.getAttribute("hidebranch");

                    if (showBranch) g.push(...showBranch.split(","));
                    if (hideBranch) w.push(...hideBranch.split(","));
                });

                g.forEach((y) => s.add(y.trim()));
                w.forEach((y) => s.delete(y.trim()));
            }

            // Push current state to history, branches, and data
            this.history.push(this.currentQuestionElement);
            this.branches.push(Array.from(s));

            // Only push the new data for the current step
            const currentStepData = Array.from(this.currentQuestionElement.querySelectorAll("input:checked")).map((y) => {
                const key = y.getAttribute("name");
                const value = y.getAttribute("type") === "checkbox"
                    ? Array.from(y.querySelectorAll(":checked")).map((checkbox) => checkbox.value)
                    : y.value;
                return [key, [value]];
            });

            this.data.push(currentStepData);

            // Create a formatted version of the survey results for display
            const formattedResults = this.data.map((stepData, index) => {
                const stepNumber = index + 1;
                const stepResults = stepData.map(([key, value]) => `${key}: ${value.join(", ")}`);
                return [`Step ${stepNumber}`, stepResults];
            });

            console.log("Survey Results:", formattedResults);

            // Get next eligible question
            const a = t ? 0 : this.questions.elements.indexOf(this.currentQuestionElement) + 1;
            const r = this.questions.elements.slice(a).filter((i) => {
                const g = i.getAttribute("branch");
                return this.branches[this.branches.length - 1].indexOf(g !== null ? g : "") >= 0;
            });

            // Set the next question and animate its appearance
            this.currentQuestionElement = r[0];
            this.currentQuestionElement.classList.add("current", "transparent");

            requestAnimationFrame(() => {
                this.currentQuestionElement.classList.remove("transparent");
                if (!t) {
                    window.scrollTo({ top: window.scrollY + this.rootElement.getBoundingClientRect().top, behavior: "smooth" });
                }
            });

            // Show appropriate buttons based on the number of eligible questions
            if (r.length == 1) {
                this.nextButton.each((i) => i.classList.add("hidden"));
                this.sendButton.each((i) => i.classList.remove("hidden"));
            } else {
                this.sendButton.each((i) => i.classList.add("hidden"));
                this.nextButton.each((i) => i.classList.remove("hidden"));
            }

            // Update progress and wait for a short duration
            this.updateProgress();

            // Add the following lines to send survey results to Telegram after showing the next question
            if (!t) {

                // Attach the event listener for the "Вiдправити" button
                this.sendButton.each((button) => {
                    button.addEventListener('click', async () => {
                        // Validate the form before submission
                        const nameInput = this.currentQuestionElement.querySelector('input[name="formName"]');
                        const phoneInput = this.currentQuestionElement.querySelector('input[name="fromPhone"]');

                        console.log(nameInput);
                        console.log(phoneInput);

                        if (nameInput && phoneInput) {
                            const name = nameInput.value;
                            const phone = phoneInput.value;

                            // Add name and phone to the survey results for the current step
                            this.data[this.data.length - 1].push(['name', [name]]);
                            this.data[this.data.length - 1].push(['phone', [phone]]);
                        }
                        const form = this.currentQuestionElement.querySelector('form');
                        if (form && form.checkValidity()) {
                            // Send the entire survey results to Telegram
                            try {
                                await sendSurveyResultsToTelegram(this.data);
                            } catch (error) {
                                console.error('Error sending survey results to Telegram:', error);
                            }
                        }
                    });
                });
            }
        }


        initRequiredCheckboxGroups() {
            e.find(this.rootElement, ".quiz_variants_group[required=checkbox]").each((t) => {
                t.addEventListener("change", function (s) {
                    if (s.target.getAttribute("type") == "checkbox") {
                        const a = Array.from(t.querySelectorAll("[type=checkbox]"));
                        t.querySelectorAll("[type=checkbox]:checked").length ? a.forEach((r) => r.removeAttribute("required")) : a.forEach((r) => r.setAttribute("required", "required"));
                    }
                });
            });
        }
        loadAutoNext() {
            this.autoNextInputs.each((t) =>
                t.addEventListener("click", () => {
                    this.currentQuestionElement.getAttribute("autonext") == "true" && this.goForward();
                })
            );
        }
        initButtonListenters() {
            this.backButton.each((t) => t.addEventListener("click", () => this.goBack())),
                this.nextButton.each((t) => t.addEventListener("click", () => this.goForward()));
            // this.sendButton.each((t) => t.addEventListener("click", () => this.sendForm()));
        }
        disableFormSubmits() {
            Array.from(this.rootElement.querySelectorAll("form")).forEach(function (t) {
                t.addEventListener("submit", function (s) {
                    return s.preventDefault(), !1;
                });
            });
        }
        syncRangeControls() {
            Array.from(this.rootElement.querySelectorAll(".quiz_question_range-input")).forEach(function (t) {
                var a;
                (a = t.querySelector("input[type=range]")) == null ||
                    a.addEventListener("input", function (r) {
                        const i = t.querySelector(".quiz_question_range-value-text");
                        i && (i.innerHTML = r.target.value), t.querySelector("input[type=number]") && (t.querySelector("input[type=number]").value = r.target.value);
                    }),
                    t.dispatchEvent(new Event("input"));
                const s = t.querySelector("input[type=number]");
                s &&
                    s.addEventListener("change", function (r) {
                        const i = t.querySelector("input[type=range]");
                        !i || ((i.value = r.target.value), i.dispatchEvent(new Event("input")));
                    });
            });
        }
        showError() {
            this.errorContainers.each((t) => t.classList.remove("hidden"));
        }
        hideError() {
            this.errorContainers.each((t) => t.classList.add("hidden"));
        }
        monitorErrors() {
            this.rootElement.addEventListener("change", () => {
                this.currentQuestionElement.classList.contains("validated") && (this.currentQuestionElement.querySelector(":invalid") ? this.showError() : this.hideError());
            });
        }
        remainingMaxSteps(t, s) {
            const a = new Set(),
                r = new Map();
            e.find(t, "input").each((d) => {
                var l, E, p;
                const u = d.getAttribute("name");
                if (u) {
                    let o = r.get(u);
                    o
                        ? (o.values.push(), r.set(u, o))
                        : r.set(u, { type: (l = d.getAttribute("type")) != null ? l : "", values: [{ show: (E = d.getAttribute("showbranch")) != null ? E : "", hide: (p = d.getAttribute("hidebranch")) != null ? p : "" }] });
                }
            }),
                r.forEach((d, u) => {
                    if (d.type == "checkbox") {
                        const l = n(d.values).map((p) => {
                            const o = new Set(),
                                q = new Set();
                            return (
                                p.forEach((k) => {
                                    k.show
                                        .split(",")
                                        .map((v) => v.trim())
                                        .forEach((v) => o.add(v)),
                                        k.hide
                                            .split(",")
                                            .map((v) => v.trim())
                                            .forEach((v) => q.add(v));
                                }),
                                { show: Array.from(o).sort().join(","), hide: Array.from(q).sort().join(",") }
                            );
                        }),
                            E = d;
                        (d.values = [...d.values, ...l]), r.set(u, E);
                    }
                });
            const i = new Set();
            e.find(t, "[required]").each((d) => {
                if (d.tagName == "input") {
                    const u = d.getAttribute("name");
                    u && i.add(u);
                    return;
                }
                d.getAttribute("required") == "true" &&
                    e.find(d, "input[type=checkbox]").each((u) => {
                        const l = u.getAttribute("name");
                        l && i.add(l);
                    });
            });
            const g = [];
            Array.from(i).forEach((d) => {
                var l;
                const u = (l = r.get(d)) == null ? void 0 : l.values;
                u && g.push(u);
            });
            const w = new B(...g).toArray(),
                y = [];
            w.forEach((d) => {
                const u = new Set(),
                    l = new Set();
                d.forEach((p) => {
                    p.show
                        .split(",")
                        .map((o) => o.trim())
                        .forEach((o) => u.add(o)),
                        p.hide
                            .split(",")
                            .map((o) => o.trim())
                            .forEach((o) => l.add(o));
                });
                const E = Array.from(u).sort().join(",") + "|" + Array.from(l).sort().join(",");
                a.has(E) || y.push({ show: Array.from(u).sort().join(","), hide: Array.from(l).sort().join(",") }), a.add(E);
            });
            const b = Array.from(r.keys()).filter((d) => !i.has(d)),
                S = [];
            b.forEach((d) => {
                var l;
                const u = (l = r.get(d)) == null ? void 0 : l.values;
                u && S.push([{ show: "", hide: "" }, ...u]);
            });
            const M = new B(...S).toArray(),
                x = [],
                Q = new Set();
            return (
                M.forEach((d) => {
                    const u = new Set(),
                        l = new Set();
                    d.forEach((p) => {
                        p.show
                            .split(",")
                            .map((o) => o.trim())
                            .forEach((o) => u.add(o)),
                            p.hide
                                .split(",")
                                .map((o) => o.trim())
                                .forEach((o) => l.add(o));
                    });
                    const E = Array.from(u).sort().join(",") + "|" + Array.from(l).sort().join(",");
                    Q.has(E) || x.push({ show: Array.from(u).sort().join(","), hide: Array.from(l).sort().join(",") }), Q.add(E);
                }),
                new B(y, x).toArray().forEach((d) => {
                    const u = new Set(),
                        l = new Set();
                    d.forEach((p) => {
                        p.show
                            .split(",")
                            .map((o) => o.trim())
                            .forEach((o) => u.add(o)),
                            p.hide
                                .split(",")
                                .map((o) => o.trim())
                                .forEach((o) => l.add(o));
                    });
                    const E = Array.from(u).sort().join(",") + "|" + Array.from(l).sort().join(",");
                    a.add(E);
                }),
                1 +
                Math.max(
                    ...Array.from(a).map((d) => {
                        const u = new Set(s),
                            [l, E] = d.split("|");
                        l
                            .split(",")
                            .map((o) => o.trim())
                            .forEach((o) => u.add(o)),
                            E.split(",")
                                .map((o) => o.trim())
                                .forEach((o) => u.delete(o));
                        const p = this.questions.elements.slice(this.questions.elements.indexOf(t) + 1).filter((o) => {
                            var q;
                            return Array.from(u).indexOf((q = o.getAttribute("branch")) != null ? q : "") >= 0;
                        });
                        return p.length == 0 ? 0 : this.remainingMaxSteps(p[0], Array.from(u));
                    })
                )
            );
        }
        updateProgress() {
            const t = this.history.length,
                s = this.history.length - 1 + this.remainingMaxSteps(this.currentQuestionElement, this.branches[this.branches.length - 1]);
            this.currentNum.each((r) => (r.textContent = t.toString())), this.totalNum.each((r) => (r.textContent = s.toString()));
            let a = "";
            for (let r = 0; r < s; r++) r < t ? (a += '<div class="item active"></div>') : (a += '<div class="item"></div>');
            this.progressContainer.innerHTML = a;
        }
    }
    m.create(".quiz");
};
I();
