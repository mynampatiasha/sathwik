
const allProjects = [
  {cat:'ecom',icon:'ti-shopping-cart',cls:'e1',title:'Fashion Retail – Meta Campaign',desc:'Managed ₹1.5L monthly budget on Meta. Targeted millennials with carousel ads. Achieved 4.2x ROAS and 2000+ lead conversions.',tags:['Meta Ads','Targeting','Conversion'],badge:'Campaign'},
  {cat:'ecom',icon:'ti-device-laptop',cls:'e2',title:'E-Commerce – Lead Generation Funnel',desc:'Built comprehensive lead generation strategy using Meta and LinkedIn. Generated 500+ qualified leads in 30 days with 15% conversion.',tags:['Lead Gen','Funnel','CRM Setup'],badge:'Campaign'},
  {cat:'ecom',icon:'ti-chart-line',cls:'e3',title:'SaaS Product Launch – Google Business',desc:'Optimized Google Business Profile, improved local rankings, and increased customer inquiries by 180% in 60 days.',tags:['Google Business','Local SEO','Reviews'],badge:'Campaign'},
  {cat:'web',icon:'ti-brand-facebook',cls:'u1',title:'Restaurant Chain – Social Media Management',desc:'Managed social media presence across 5 locations. 300% engagement increase and 200+ new orders from social campaigns.',tags:['Facebook','Instagram','Content'],badge:'Live'},
  {cat:'web',icon:'ti-chart-bar',cls:'u2',title:'Startup – Brand Visibility Campaign',desc:'Comprehensive digital marketing campaign. Increased brand awareness by 250% and achieved 3.8x ROAS across all channels.',tags:['Meta','Google','LinkedIn'],badge:'Campaign'},
  {cat:'design',icon:'ti-palette',cls:'u1',title:'Content Calendar – Travel Brand',desc:'Designed 3-month content calendar with 100+ custom social media posts. Increased follower engagement by 150%.',tags:['Canva','Content','Posting'],badge:'Campaign'},
  {cat:'design',icon:'ti-video',cls:'e2',title:'Video Editing – E-Commerce Reels',desc:'Created 30+ engaging reels and video content for social media. Achieved 2M+ views and 5x product inquiry rate.',tags:['Video','Canva','Reels'],badge:'Campaign'},
  {cat:'marketing',icon:'ti-chart-dots',cls:'e3',title:'B2B Lead Generation – LinkedIn',desc:'LinkedIn marketing campaign for tech company. Generated 300+ qualified B2B leads with 18% conversion to meetings.',tags:['LinkedIn','B2B','Leads'],badge:'Campaign'},
  {cat:'marketing',icon:'ti-mail',cls:'u2',title:'Email Marketing – E-Commerce',desc:'Designed email marketing sequences. 38% open rate and 12% click-through rate, 5x industry average.',tags:['Email','Automation','Copywriting'],badge:'Campaign'},
  {cat:'btech',icon:'ti-search',cls:'u1',title:'Local Business SEO Optimization',desc:'SEO optimization for 15 local businesses. Average ranking improvement from page 3 to page 1 for target keywords.',tags:['SEO','Google Business','Analytics'],badge:'Campaign'},
  {cat:'btech',icon:'ti-brain',cls:'e1',title:'Competitor Analysis – Market Research',desc:'Comprehensive market analysis and competitor campaign audit. Identified 5 key optimization opportunities.',tags:['Analytics','Research','Strategy'],badge:'Report'},
  {cat:'btech',icon:'ti-device-mobile',cls:'e3',title:'Mobile App Marketing – Launch Campaign',desc:'Multi-channel app launch campaign. 50K+ downloads in first month, 4.5x user acquisition target.',tags:['App Marketing','Ads','Strategy'],badge:'Campaign'},
  {cat:'automation',icon:'ti-robot',cls:'u2',title:'CRM Lead Automation – Zapier Setup',desc:'Automated lead capture from 5 different sources into Salesforce CRM. Saved 20 hours/week of manual data entry.',tags:['Zapier','CRM','Automation'],badge:'Live'},
  {cat:'automation',icon:'ti-settings',cls:'e2',title:'Social Media Auto-Posting',desc:'Automated social media scheduling across Meta, Instagram, and LinkedIn. Consistent brand presence with minimal effort.',tags:['Social Media','Scheduling','Automation'],badge:'Live'},
];

function renderProjects(filter){
  const c=document.getElementById('projects-container');
  const list=filter==='all'?allProjects:allProjects.filter(p=>p.cat===filter);
  c.innerHTML=list.map(p=>`
    <div class="project-card">
      <div class="project-thumb ${p.cls}"><i class="ti ${p.icon}" style="color:var(--gold)"></i><span class="project-badge">${p.badge}</span></div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-tags">${p.tags.map(t=>`<span class="ptag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}
renderProjects('all');

function filterProjects(f,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderProjects(f);
}

const SHEET_ENDPOINT = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
const SUCCESS_MESSAGE = '✅ Message sent! Sathwik will get back to you within 24 hours.';
const ERROR_MESSAGE = '⚠️ Unable to send your message right now. Please try again later.';

function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  window.scrollTo(0,0);
}

function scrollToSection(id){
  showPage('home');
  setTimeout(()=>{
    const el=document.getElementById(id);
    if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
  },50);
}

function toggleFaq(btn){
  const ans=btn.nextElementSibling;
  const icon=btn.querySelector('i');
  const open=ans.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a=>a.classList.remove('open'));
  document.querySelectorAll('.faq-q i').forEach(i=>i.style.transform='');
  if(!open){ans.classList.add('open');icon.style.transform='rotate(180deg)';}
}

function submitForm(){
  const name=document.getElementById('f-name').value.trim();
  const email=document.getElementById('f-email').value.trim();
  const phone=document.getElementById('f-phone').value.trim();
  const service=document.getElementById('f-service').value;
  const budget=document.getElementById('f-budget').value;
  const msg=document.getElementById('f-msg').value.trim();
  if(!name||!email||!service||!msg){
    alert('Please fill in all required fields.');
    return;
  }

  const payload = {
    name,
    email,
    phone,
    service,
    budget,
    message: msg,
    timestamp: new Date().toISOString()
  };

  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';
  document.getElementById('success-msg').style.display = 'none';

  fetch(SHEET_ENDPOINT, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.text();
  })
  .then(() => {
    showSuccess(SUCCESS_MESSAGE);
    clearForm();
  })
  .catch(error => {
    console.error('Sheet submit error:', error);
    showSuccess(ERROR_MESSAGE);
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <i class="ti ti-send" style="margin-left:6px"></i>';
  });
}

function clearForm(){
  document.getElementById('f-name').value='';
  document.getElementById('f-email').value='';
  document.getElementById('f-phone').value='';
  document.getElementById('f-service').value='';
  document.getElementById('f-budget').value='';
  document.getElementById('f-msg').value='';
}

function showSuccess(text){
  const msg = document.getElementById('success-msg');
  msg.textContent = text;
  msg.style.display = 'block';
}
