//Copyright (C) 2018- Dmitry Baranovskiy (http://dmitry.baranovskiy.com)
// Raphael 2.2.1 - JavaScript Vector Library (http://dmitrybaranovskiy.github.io/raphael/)
//To work, Raphael needs an older version of jQuery, namely the 1.3.1 version


Raphael.fn.drawGrid = function (x_dG, y_dG, w_dG, h_dG, wv_dG, hv_dG, color_dG) {
    color_dG = color_dG || "#000";
    var path_dG = ["M",Math.round(x_dG) + .5, Math.round(y_dG) + .5,"L",Math.round(x_dG + w_dG) + .5, Math.round(y_dG) + .5,Math.round(x_dG + w_dG) + .5, Math.round(y_dG + h_dG) + .5,Math.round(x_dG) + .5, 
Math.round(y_dG + h_dG) + .5,Math.round(x_dG) + .5, Math.round(y_dG) + .5],
         rowHeight_dG = h_dG / hv_dG,
         columnWidth_dG = w_dG / wv_dG;
    for (var i_dG = 1; i_dG < hv_dG; i_dG++) {
        path_dG = path_dG.concat(["M",Math.round(x_dG) + .5, Math.round(y_dG + i_dG * rowHeight_dG) + .5,"H",Math.round(x_dG + w_dG) + .5]);
    }
    for (i_dG = 1; i_dG < wv_dG; i_dG++) {
        path_dG = path_dG.concat(["M",Math.round(x_dG + i_dG * columnWidth_dG) + .5, Math.round(y_dG) + .5,"V",Math.round(y_dG + h_dG) + .5]);
    }
    return this.path(path_dG.join(",")).attr({stroke: color_dG});
};



window.onload = function () {

    var cursurile_mele = ["lfcmvia", "asor", "edi"],
        culorile_mele = ["#8A0808", "#08298A", "#1F7A1F"],
        semestrele_mele = ["2018", "2019"];

    var culorile_mele_preparate = [],
        datele_mele = [],
        wrapperele_mele = [],
        holderele_mele = [],
        labels_ale_mele = [],
        data_ale_mele = [],
        inalt_ale_mele = [],
        lat_ale_mele = [];

    function prepararea_culorii(elementul) {
        culorile_mele_preparate[elementul] = culorile_mele[cursurile_mele.indexOf(elementul)];
    }

    function compunerea_numelui(elementul) {
        datele_mele[elementul] = "#data_" + elementul + "";
        wrapperele_mele[elementul] = "#wrapper_for_" + elementul + "";
        holderele_mele[elementul] = "#holder_" + elementul + "";

    }

    function ascunderea_tabelului(elementul) {
        $(datele_mele[elementul]).css({ position: "absolute", left: "-9999em", top: "-9999em" });
    }

    function preluarea_datelor(elementul) {
        labels_ale_mele[elementul] = [];
        data_ale_mele[elementul] = [];
        $("" + datele_mele[elementul] + " tfoot th").each(function () {
            labels_ale_mele[elementul].push($(this).html());
        });
        $("" + datele_mele[elementul] + " tbody td").each(function () {
            data_ale_mele[elementul].push($(this).html());
        });
    }

    function preluarea_dimensiunilor(elementul) {
        inalt_ale_mele[elementul] = $(wrapperele_mele[elementul]).height();
        lat_ale_mele[elementul] = $(wrapperele_mele[elementul]).width();
    }

    function construirea_statisticii(elementul) {
        // Draw
        var width = lat_ale_mele[elementul],//520,
            height = inalt_ale_mele[elementul],//250
            leftgutter = 30,
            bottomgutter = 30,
            topgutter = 30,
            /**
            * octaG: dec 7, 2017
            * replaced all of this with constant strings.
            * colorhue = .6 || Math.random(),
            * color = "hsl(" + [colorhue, .5, .5] + ")",
            */
            color_dG,
            nume_potrivit = holderele_mele[elementul].replace(/#/g,''),
            r = Raphael(nume_potrivit, width, height),
            txt = { font: '12px Helvetica, Arial', fill: "#000" },//14px
            txt2 = { font: '12px Helvetica, Arial', fill: "#000" },//10px
            X = (width - leftgutter) / labels_ale_mele[elementul].length,
            max = Math.max.apply(Math, data_ale_mele[elementul]),
            Y = (height - bottomgutter - topgutter) / max;

        r.drawGrid(leftgutter + X * .5 + .5, topgutter + .5, width - leftgutter - X, height - topgutter - bottomgutter, 10, 10, culorile_mele_preparate[elementul]);

        var path = r.path().attr({ stroke: culorile_mele_preparate[elementul], "stroke-width": 4, "stroke-linejoin": "round" }),
            bgp = r.path().attr({ stroke: "none", opacity: .3, fill: culorile_mele_preparate[elementul] }),
            label = r.set(),
            lx = 0, ly = 0,
            is_label_visible = false,
            leave_timer,
            blanket = r.set();

        label.push(r.text(60, 16, "28 persoane").attr(txt));
        label.push(r.text(60, 33, "29.XII.2017").attr(txt2).attr({ fill: culorile_mele_preparate[elementul] }));
        label.hide();

        var frame = r.popup(100, 100, label, "right").attr({ fill: "#fff", stroke: culorile_mele_preparate[elementul], "stroke-width": 2, "fill-opacity": .7 }).hide();

        var p, bgpp;

        for (var i = 0, ii = labels_ale_mele[elementul].length; i < ii; i++) {

            var y = Math.round(height - bottomgutter - Y * data_ale_mele[elementul][i]),
                x = Math.round(leftgutter + X * (i + .5)),
                t = r.text(x, height - 6, labels_ale_mele[elementul][i]).attr(txt).toBack();

            if (!i) {
                p = ["M", x, y, "C", x, y];
                bgpp = ["M", leftgutter + X * .5, height - bottomgutter, "L", x, y, "C", x, y];
            }

            if (i && i < ii - 1) {
                var Y0 = Math.round(height - bottomgutter - Y * data_ale_mele[elementul][i - 1]),
                    X0 = Math.round(leftgutter + X * (i - .5)),
                    Y2 = Math.round(height - bottomgutter - Y * data_ale_mele[elementul][i + 1]),
                    X2 = Math.round(leftgutter + X * (i + 1.5));
                var a = getAnchors(X0, Y0, x, y, X2, Y2);

                p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
                bgpp = bgpp.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
            }

            var dot = r.circle(x, y, 4).attr({ fill: "#fff", stroke: culorile_mele_preparate[elementul], "stroke-width": 2 });
            blanket.push(r.rect(leftgutter + X * i, 0, X, height - bottomgutter).attr({ stroke: "none", fill: "#fff", opacity: 0 }));
            var rect = blanket[blanket.length - 1];

            (function (x, y, data, lbl, dot) {
                var timer, i = 0;
                rect.hover(function () {
                    clearTimeout(leave_timer);
                    var side = "right";
                    if (x + frame.getBBox().width > width) {
                        side = "left";
                    }
                    var ppp = r.popup(x, y, label, side, 1),
                        anim = Raphael.animation({
                            path: ppp.path,
                            transform: ["t", ppp.dx, ppp.dy]
                        }, 200 * is_label_visible);
                    lx = label[0].transform()[0][1] + ppp.dx;
                    ly = label[0].transform()[0][2] + ppp.dy;
                    frame.show().stop().animate(anim);
                    label[0].attr({ text: data + " persoan" + (data == 1 ? "a" : "e") }).show().stop().animateWith(frame, anim, { transform: ["t", lx, ly] }, 200 * is_label_visible);
                    var sirul_datei = lbl.split("."),
                        ziua = sirul_datei[0],
                        luna = sirul_datei[1],
                        anul,
                        data_prelucrata;
                    switch (luna) {
                        case 'I':
                        case 'II':
                        case 'III':
                        case 'IV':
                        case 'V':
                        case 'VI':
                        case 'VII': anul = semestrele_mele[1]; break;
                        default: anul = semestrele_mele[0];
                    }
                    data_prelucrata = ziua + "." + luna + "." + anul;
                    label[1].attr({ text: data_prelucrata }).show().stop().animateWith(frame, anim, { transform: ["t", lx, ly] }, 200 * is_label_visible);
                    dot.attr("r", 8);
                    is_label_visible = true;
                }, function () {
                    dot.attr("r", 4);
                    leave_timer = setTimeout(function () {
                        frame.hide();
                        label[0].hide();
                        label[1].hide();
                        is_label_visible = false;
                    }, 1);
                });
            })(x, y, data_ale_mele[elementul][i], labels_ale_mele[elementul][i], dot);
        }

        p = p.concat([x, y, x, y]);
        bgpp = bgpp.concat([x, y, x, y, "L", x, height - bottomgutter, "z"]);
        path.attr({ path: p });
        bgp.attr({ path: bgpp });
        frame.toFront();
        label[0].toFront();
        label[1].toFront();
        blanket.toFront();
    }

    function getAnchors(p1x, p1y, p2x, p2y, p3x, p3y) {
        var l1 = (p2x - p1x) / 2,
            l2 = (p3x - p2x) / 2,
            a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
            b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
        a = p1y < p2y ? Math.PI - a : a;
        b = p3y < p2y ? Math.PI - b : b;
        var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
            dx1 = l1 * Math.sin(alpha + a),
            dy1 = l1 * Math.cos(alpha + a),
            dx2 = l2 * Math.sin(alpha + b),
            dy2 = l2 * Math.cos(alpha + b);
        return {
            x1: p2x - dx1,
            y1: p2y + dy1,
            x2: p2x + dx2,
            y2: p2y + dy2
        };
    }

    $(function () {
        cursurile_mele.forEach(compunerea_numelui);
        cursurile_mele.forEach(ascunderea_tabelului);
        cursurile_mele.forEach(preluarea_datelor);
        cursurile_mele.forEach(preluarea_dimensiunilor);
        cursurile_mele.forEach(prepararea_culorii);
        cursurile_mele.forEach(construirea_statisticii);
    });
};