// 0 8-9
// 1 9-10
// 2 10-11
// 3 11-12
// 4 12-1
// 5 1-2
// 6 2-3
// 7 3-4
// 8 4-5
// 9 5-6
// 10 6-7

meets = [
    {
        0: ['https://meet.google.com/sky-zjog-dca', 'MATHEMATICS-II'],
        1: ['https://meet.google.com/czm-jnjh-xyg', 'MECH OSCIL & WAVES'],
        2: ['https://meet.google.com/edx-jgfu-hrf', 'MATHEMATICS-II'],
        3: ['https://meet.google.com/ffk-fdkz-kpk', 'COMPUTER PROGRAMMING'],
        4: ['https://meet.google.com/kcb-wzkz-kav', 'ELECTRICAL SCIENCES'],
        5: '',
        6: '',
        7: '',
        8: ['https://meet.google.com/pnb-guub-irc', 'THERMODYNAMICS'],
        9: ['https://meet.google.com/vdh-vpto-vue', 'MECH OSCIL & WAVES'],
        10: ''
    },
    {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: ['https://meet.google.com/znr-ursi-tyu', 'TECH REPORT WRITING'],
        9: ['', 'COMPUTER PROGRAMMING'],
        10: ''
    },
    {
        0: '',
        1: ['https://meet.google.com/osc-dbqh-zjt', 'MECH OSCIL & WAVES'],
        2: ['https://meet.google.com/edx-jgfu-hrf', 'MATHEMATICS-II'],
        3: ['https://meet.google.com/ffk-fdkz-kpk', 'COMPUTER PROGRAMMING'],
        4: ['https://meet.google.com/kcb-wzkz-kav', 'ELECTRICAL SCIENCES'],
        5: '',
        6: '',
        7: '',
        8: ['https://meet.google.com/pnb-guub-irc', 'THERMODYNAMICS'],
        9: ['https://meet.google.com/mhb-aoxv-dor', 'ELECTRICAL SCIENCES'],
        10: ''
    },
    {
        0: '',
        1: '',
        2: ['https://meet.google.com/xwj-rsyk-ibc', 'WORKSHOP PRACTICE'],
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: ['https://meet.google.com/znr-ursi-tyu', 'TECH REPORT WRITING'],
        9: ['https://meet.google.com/vky-rsgf-wno', 'THERMODYNAMICS'],
        10: ''
    },
    {
        0: '',
        1: ['https://meet.google.com/vdh-vpto-vue', 'MECH OSCIL & WAVES'],
        2: ['https://meet.google.com/edx-jgfu-hrf', 'MATHEMATICS-II'],
        3: ['https://meet.google.com/ffk-fdkz-kpk', 'COMPUTER PROGRAMMING'],
        4: ['https://meet.google.com/kcb-wzkz-kav', 'ELECTRICAL SCIENCES'],
        5: '',
        6: ['https://meet.google.com/noi-yaez-seb', 'WORKSHOP PRACTICE'],
        7: '',
        8: ['https://meet.google.com/xxm-pypr-pcq', 'THERMODYNAMICS'],
        9: '',
        10: ''
    },
    {
        0: '',
        1: ['https://meet.google.com/pwy-azqp-whw', 'BIOLOGICAL LABORATORY'],
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: ''
    }
]

function print(x)
{
    console.log(x);
}

var ongoing_class = document.getElementsByClassName("link")[0];
var next_class = document.getElementsByClassName("link")[1];

var faces = [">.<", "^.^", ":-D", "¯\\_(ツ)_/¯"];

window.localStorage.removeItem("OPENED");

run();
window.setInterval(run, 20000);

function run()
{
    day = new Date().getDay();
    hour = new Date().getHours();
    minute = new Date().getMinutes();
    
    if(day == 0)
    {
        return;
    }
    day--;
    hour -= 8;
    
    links = meets[day];
    
    // Print Current Meet
    
    let found_current = false;
    for(let [time, link] of Object.entries(links))
    {
        // [link, name] = link;
        if(time == hour && link!="")
        {
            [link, name] = link
            ongoing_class.innerHTML = "<span>"+name+"</span><span>"+link.replace("https://", '')+"</span>";
            // ongoing_class.innerHTML = link.replace("https://", '');
            ongoing_class.setAttribute("href", link);
            document.getElementsByClassName("footnote")[0].innerHTML = `Started ${minute==0?"just now":(minute+" minutes ago")}`;
            found_current = true;
            if(minute <= 15 && window.localStorage.getItem("OPENED") != link)
            {
                window.location.replace(link);
                window.localStorage.setItem("OPENED", link);
            }
            break;
        }
    }
    if(!found_current)
    {
        ongoing_class.innerHTML = faces[parseInt(Math.random()*faces.length)];
        ongoing_class.removeAttribute("href");
        document.getElementsByClassName("footnote")[0].innerHTML = '';
    }
    
    // Print NEXT Meet
    
    let found_next = false;
    for(let [time, link] of Object.entries(links))
    {
        if(time > hour && link != "")
        {
            [link, name] = link;
            print(link);
            next_class.innerHTML = "<span>"+name+"</span><span>"+link.replace("https://", '')+"</span>";
            next_class.setAttribute("href", link);
            document.getElementsByClassName("footnote")[1].innerHTML = `In ${time==hour+1?(60-minute)+" minutes":(time-hour)+" hours"}`;
            found_next = true;
            
            if(minute >= 58 && window.localStorage.getItem("OPENED") != link)
            {
                window.location.replace(link);
                window.localStorage.setItem("OPENED", link);
            }
            break;
        }
    }
    if(!found_next)
    {
        next_class.innerHTML = faces[parseInt(Math.random()*faces.length)];
        next_class.removeAttribute("href");
        document.getElementsByClassName("footnote")[1].innerHTML = '';
    }
}