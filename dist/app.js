document.querySelectorAll('[data-project-toggle]').forEach(toggle => {
  const panel = document.getElementById(toggle.getAttribute('aria-controls'));
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
    toggle.replaceChildren(document.createTextNode(expanded ? `${toggle.dataset.openLabel} ` : 'Close the details '));
    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = expanded ? '↗' : '−';
    toggle.append(icon);
  });
});
const steps = [
 ['CONTEXT_SEARCH.EXECUTE()', 'First, find relevant information.', 'The question becomes an embedding. Semantic similarity and keywords help surface relevant chunks from the knowledge base.', ['document_chunk_01', 'document_chunk_02', 'document_chunk_03'], [92,74,51]],
 ['PROMPT.AUGMENT(CONTEXT)', 'Bring context and question together.', 'Selected document chunks are combined with the user’s question. The context is prepared before the model generates an answer.', ['system_instructions', 'retrieved_context', 'user_question'], [60,95,40]],
 ['LLM.GENERATE(RESPONSE)', 'Generate an answer from the context.', 'The language model generates an answer using the prepared context. Schema validation checks its structure; source quality and factual accuracy still need separate evaluation.', ['context_grounded', 'schema_validation', 'response_output'], [95,100,100]]
];
const tabs = [...document.querySelectorAll('[data-step]')];
function selectStep(index) {
 tabs.forEach((tab, i) => {tab.setAttribute('aria-selected', String(i === index));tab.tabIndex = i === index ? 0 : -1;});
 const [code,title,description,labels,widths] = steps[index];
 document.querySelector('#rag-code').textContent=code;
 document.querySelector('#rag-title').textContent=title;
 document.querySelector('#rag-text').textContent=description;
 document.querySelector('#rag-panel').setAttribute('aria-labelledby', `tab${index}`);
 document.querySelectorAll('.retrieval-bars>div').forEach((bar,i)=>{bar.querySelector('span').textContent=labels[i];bar.querySelector('b').style.width=`${widths[i]}%`;});
}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectStep(index));tab.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%3;else if(event.key==='ArrowLeft')next=(index+2)%3;else if(event.key==='Home')next=0;else if(event.key==='End')next=2;else return;event.preventDefault();selectStep(next);tabs[next].focus();});});
