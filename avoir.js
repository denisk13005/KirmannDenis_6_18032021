  filterPhotographByTag(tags, targetedTag) {
    const articles = this.container.querySelectorAll('article');
    const activeTags = [];

    // Toggle active class if tag is the same text as target
    // Then if tag has active class, add to array
    tags.forEach((tag) => {
      const isSameTagText = tag.textContent.toLowerCase() === targetedTag.textContent.toLowerCase();
      if (isSameTagText) {
        tag.classList.toggle('active');
      } else {
        tag.classList.remove('active');
      }
      if (tag.classList.contains('active')) {
        activeTags.push(tag);
      }
    });

    // Display all photographers if no activeTag
    if (activeTags.length === 0) {
      articles.forEach((article) => article.classList.remove('hidden'));
      return;
    }

    // Hide all articles, then display the parent articles from active tags array
    articles.forEach((article) => article.classList.add('hidden'));
    activeTags.forEach((tag) => {
      const article = tag.closest('.article');
      // active tag is not from header nav
      if (article !== null) article.classList.remove('hidden');
    });
  }