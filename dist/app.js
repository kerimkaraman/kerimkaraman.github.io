/* RAG walkthrough: tabs swap the note and the retrieval bars. */
(function () {
  const steps = [
    ['CONTEXT_SEARCH.EXECUTE()', 'First, find relevant information.', 'The question becomes an embedding. Semantic similarity and keywords help surface relevant chunks from the knowledge base.', ['document_chunk_01', 'document_chunk_02', 'document_chunk_03'], [92, 74, 51]],
    ['PROMPT.AUGMENT(CONTEXT)', 'Bring context and question together.', 'Selected document chunks are combined with the user’s question. The context is prepared before the model generates an answer.', ['system_instructions', 'retrieved_context', 'user_question'], [60, 95, 40]],
    ['LLM.GENERATE(RESPONSE)', 'Generate an answer from the context.', 'The language model generates an answer using the prepared context. Schema validation checks its structure; source quality and factual accuracy still need separate evaluation.', ['context_grounded', 'schema_validation', 'response_output'], [95, 100, 100]]
  ];
  const tabs = [...document.querySelectorAll('[data-step]')];
  const code = document.getElementById('rag-code');
  const title = document.getElementById('rag-title');
  const text = document.getElementById('rag-text');
  const panel = document.getElementById('rag-panel');
  const bars = [...document.querySelectorAll('.bars .bar')];

  function selectStep(index) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    const [nextCode, nextTitle, nextText, labels, widths] = steps[index];
    code.textContent = nextCode;
    title.textContent = nextTitle;
    text.textContent = nextText;
    panel.setAttribute('aria-labelledby', `tab${index}`);
    bars.forEach((bar, i) => {
      bar.querySelector('span').textContent = labels[i];
      bar.querySelector('b').style.width = `${widths[i]}%`;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectStep(index));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectStep(next);
      tabs[next].focus();
    });
  });
})();
