document.addEventListener('DOMContentLoaded', async () => {
  const BIN_ID     = '6a429bb8da38895dfe111592';
  const MASTER_KEY = '$2a$10$zudlj2WxmZPA3xjPauFPSeJ0FeHP2yF//.EKwZBFaB2EVoTV7Xw..';
  const BIN_URL    = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  // Alpha-2 → display name
  const countryNames = {
    AF:'Afghanistan',AL:'Albania',DZ:'Algeria',AO:'Angola',AR:'Argentina',
    AM:'Armenia',AU:'Australia',AT:'Austria',AZ:'Azerbaijan',BH:'Bahrain',
    BD:'Bangladesh',BY:'Belarus',BE:'Belgium',BZ:'Belize',BJ:'Benin',
    BT:'Bhutan',BO:'Bolivia',BA:'Bosnia',BW:'Botswana',BR:'Brazil',
    BN:'Brunei',BG:'Bulgaria',BF:'Burkina Faso',BI:'Burundi',KH:'Cambodia',
    CM:'Cameroon',CA:'Canada',CF:'Cent. African Rep.',TD:'Chad',CL:'Chile',
    CN:'China',CO:'Colombia',CG:'Congo',CR:'Costa Rica',HR:'Croatia',
    CU:'Cuba',CY:'Cyprus',CZ:'Czech Republic',DK:'Denmark',DO:'Dominican Rep.',
    EC:'Ecuador',EG:'Egypt',SV:'El Salvador',EE:'Estonia',ET:'Ethiopia',
    FI:'Finland',FR:'France',GA:'Gabon',GE:'Georgia',DE:'Germany',GH:'Ghana',
    GR:'Greece',GT:'Guatemala',GN:'Guinea',HT:'Haiti',HN:'Honduras',
    HU:'Hungary',IS:'Iceland',IN:'India',ID:'Indonesia',IR:'Iran',IQ:'Iraq',
    IE:'Ireland',IL:'Israel',IT:'Italy',JM:'Jamaica',JP:'Japan',JO:'Jordan',
    KZ:'Kazakhstan',KE:'Kenya',KP:'North Korea',KR:'South Korea',KW:'Kuwait',
    KG:'Kyrgyzstan',LA:'Laos',LV:'Latvia',LB:'Lebanon',LR:'Liberia',
    LY:'Libya',LT:'Lithuania',LU:'Luxembourg',MG:'Madagascar',MW:'Malawi',
    MY:'Malaysia',ML:'Mali',MT:'Malta',MR:'Mauritania',MX:'Mexico',
    MD:'Moldova',MN:'Mongolia',ME:'Montenegro',MA:'Morocco',MZ:'Mozambique',
    MM:'Myanmar',NA:'Namibia',NP:'Nepal',NL:'Netherlands',NZ:'New Zealand',
    NI:'Nicaragua',NE:'Niger',NG:'Nigeria',MK:'North Macedonia',NO:'Norway',
    OM:'Oman',PK:'Pakistan',PA:'Panama',PG:'Papua New Guinea',PY:'Paraguay',
    PE:'Peru',PH:'Philippines',PL:'Poland',PT:'Portugal',QA:'Qatar',
    RO:'Romania',RU:'Russia',RW:'Rwanda',SA:'Saudi Arabia',SN:'Senegal',
    RS:'Serbia',SL:'Sierra Leone',SG:'Singapore',SK:'Slovakia',SI:'Slovenia',
    SO:'Somalia',ZA:'South Africa',SS:'South Sudan',ES:'Spain',LK:'Sri Lanka',
    SD:'Sudan',SR:'Suriname',SE:'Sweden',CH:'Switzerland',SY:'Syria',
    TW:'Taiwan',TJ:'Tajikistan',TZ:'Tanzania',TH:'Thailand',TL:'Timor-Leste',
    TG:'Togo',TN:'Tunisia',TR:'Turkey',TM:'Turkmenistan',UG:'Uganda',
    UA:'Ukraine',AE:'UAE',GB:'United Kingdom',US:'United States',UY:'Uruguay',
    UZ:'Uzbekistan',VE:'Venezuela',VN:'Vietnam',YE:'Yemen',ZM:'Zambia',ZW:'Zimbabwe',
  };

  // Alpha-2 → ISO numeric (used by D3 world-atlas)
  const alpha2ToNum = {
    AF:4,AL:8,DZ:12,AO:24,AR:32,AM:51,AU:36,AT:40,AZ:31,BH:48,BD:50,
    BY:112,BE:56,BZ:84,BJ:204,BT:64,BO:68,BA:70,BW:72,BR:76,BN:96,BG:100,
    BF:854,BI:108,KH:116,CM:120,CA:124,CF:140,TD:148,CL:152,CN:156,CO:170,
    CG:178,CR:188,HR:191,CU:192,CY:196,CZ:203,DK:208,DO:214,EC:218,EG:818,
    SV:222,EE:233,ET:231,FI:246,FR:250,GA:266,GE:268,DE:276,GH:288,GR:300,
    GT:320,GN:324,HT:332,HN:340,HU:348,IS:352,IN:356,ID:360,IR:364,IQ:368,
    IE:372,IL:376,IT:380,JM:388,JP:392,JO:400,KZ:398,KE:404,KP:408,KR:410,
    KW:414,KG:417,LA:418,LV:428,LB:422,LR:430,LY:434,LT:440,LU:442,MG:450,
    MW:454,MY:458,ML:466,MT:470,MR:478,MX:484,MD:498,MN:496,ME:499,MA:504,
    MZ:508,MM:104,NA:516,NP:524,NL:528,NZ:554,NI:558,NE:562,NG:566,MK:807,
    NO:578,OM:512,PK:586,PA:591,PG:598,PY:600,PE:604,PH:608,PL:616,PT:620,
    QA:634,RO:642,RU:643,RW:646,SA:682,SN:686,RS:688,SL:694,SG:702,SK:703,
    SI:705,SO:706,ZA:710,SS:728,ES:724,LK:144,SD:729,SR:740,SE:752,CH:756,
    SY:760,TW:158,TJ:762,TZ:834,TH:764,TL:626,TG:768,TN:788,TR:792,TM:795,
    UG:800,UA:804,AE:784,GB:826,US:840,UY:858,UZ:860,VE:862,VN:704,YE:887,
    ZM:894,ZW:716,
  };

  const numToAlpha2 = Object.fromEntries(Object.entries(alpha2ToNum).map(([a,n]) => [n,a]));

  const isDark = () => document.body.classList.contains('dark-mode');

  async function fetchVisits() {
    try {
      const res = await fetch(BIN_URL + '/latest', { headers: { 'X-Master-Key': MASTER_KEY } });
      const data = await res.json();
      return data.record || {};
    } catch { return {}; }
  }

  async function saveVisits(data) {
    try {
      await fetch(BIN_URL, {
        method: 'PUT',
        headers: { 'X-Master-Key': MASTER_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {}
  }

  async function getCountryCode() {
    try {
      const res = await fetch('https://ipwho.is/');
      const data = await res.json();
      return data.success ? data.country_code : null;
    } catch { return null; }
  }

  async function trackVisit(visits) {
    if (sessionStorage.getItem('_v')) return visits;
    const code = await getCountryCode();
    if (!code) return visits;
    const updated = { ...visits, [code]: (visits[code] || 0) + 1 };
    await saveVisits(updated);
    sessionStorage.setItem('_v', '1');
    return updated;
  }

  async function renderMap(visits) {
    d3.select('#visitor-map').selectAll('svg,div.map-stats').remove();
    const vals   = Object.values(visits);
    const maxVal = vals.length ? Math.max(...vals) : 1;
    const total  = vals.reduce((a, b) => a + b, 0);
    const width  = document.getElementById('visitor-map').offsetWidth || 660;
    const height = Math.round(width * 0.5);

    const svg = d3.select('#visitor-map')
      .append('svg')
      .attr('width', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('border-radius', '8px');

    const top5 = Object.entries(visits).sort((a,b) => b[1]-a[1]).slice(0,5)
      .map(([c,n]) => `${countryNames[c]||c} (${n})`);
    d3.select('#visitor-map').append('div').attr('class','map-stats').html(`
      <span class="map-total"><strong>${total.toLocaleString()}</strong> visits from <strong>${Object.keys(visits).length}</strong> countries</span>
      <span class="map-top">Top: ${top5.join(' · ')}</span>
    `);

    function color(numId) {
      const a2 = numToAlpha2[numId];
      const n  = a2 ? (visits[a2] || 0) : 0;
      if (!n) return isDark() ? '#232323' : '#f0f0f0';
      return d3.interpolateBlues(0.2 + Math.pow(n / maxVal, 0.45) * 0.8);
    }

    const world      = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const projection = d3.geoNaturalEarth1().scale(width/6.5).translate([width/2, height/2]);
    const path       = d3.geoPath().projection(projection);
    const features   = topojson.feature(world, world.objects.countries).features;
    const tooltip    = d3.select('body').append('div').attr('class','map-tooltip');

    svg.append('path').datum(d3.geoGraticule()()).attr('d',path)
      .attr('fill','none').attr('stroke', isDark()?'#2a2a2a':'#e4e4e4')
      .attr('stroke-width',0.3).attr('class','graticule');

    const paths = svg.selectAll('path.country').data(features).join('path')
      .attr('class','country').attr('d',path)
      .attr('fill', d => color(+d.id))
      .attr('stroke', isDark()?'#1a1a1a':'#fff').attr('stroke-width',0.4);

    const hoverPath = svg.append('path').attr('class','country-hover')
      .attr('fill','none').attr('stroke','#1d4ed8').attr('stroke-width',1.5)
      .attr('pointer-events','none').style('display','none');

    paths
      .on('mouseover', function(event, d) {
        const a2 = numToAlpha2[+d.id]; const n = a2?(visits[a2]||0):0;
        hoverPath.style('display',null).attr('d',path(d));
        tooltip.style('opacity',1).html(`<strong>${(a2&&countryNames[a2])||a2||'—'}</strong><br/>${n?n+' visit'+(n>1?'s':''):'no visits yet'}`);
      })
      .on('mousemove', e => tooltip.style('left',e.pageX+12+'px').style('top',e.pageY-36+'px'))
      .on('mouseout', () => { hoverPath.style('display','none'); tooltip.style('opacity',0); });

    document.getElementById('darkModeToggle')?.addEventListener('click', () => {
      setTimeout(() => {
        paths.attr('fill',d=>color(+d.id)).attr('stroke',isDark()?'#1a1a1a':'#fff');
        svg.select('.graticule').attr('stroke',isDark()?'#2a2a2a':'#e4e4e4');
      }, 50);
    });
  }

  try {
    let visits = await fetchVisits();
    visits = await trackVisit(visits);

    // Show small counter in footer
    const total   = Object.values(visits).reduce((a, b) => a + b, 0);
    const countEl = document.getElementById('visitor-count');
    if (countEl && total > 0) {
      countEl.textContent = `${total.toLocaleString()} visits · ${Object.keys(visits).length} countries`;
    }

    await renderMap(visits);
  } catch {}
});
