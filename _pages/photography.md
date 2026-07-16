---
layout: page
title: photography
permalink: /photography/
description: Some of my favorite moments, captured by my phone camera. Developing my skills as an amateur photographer!
nav: true
nav_order: 5
images:
  lightbox2: true
---

<style>
  .photography-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  @media (min-width: 576px) {
    .photography-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 768px) {
    .photography-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .photography-grid a,
  .photography-grid .photography-video {
    display: block;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 0.5rem;
  }
  .photography-grid img,
  .photography-grid video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<div class="photography">
{% if site.data.photography and site.data.photography.size > 0 %}
  <div class="photography-grid">
    {% for item in site.data.photography %}
      {% if item.video %}
        <div class="photography-video">
          <video
            controls
            muted
            playsinline
            preload="metadata"
            {% if item.image %}poster="{{ item.image | url_encode | prepend: '/assets/img/photography/' | relative_url }}"{% endif %}
          >
            <source src="{{ item.video | url_encode | prepend: '/assets/video/photography/' | relative_url }}" type="video/mp4" />
          </video>
        </div>
      {% else %}
        <a
          href="{{ item.image | url_encode | prepend: '/assets/img/photography/' | relative_url }}"
          data-lightbox="photography"
          data-title="{{ item.alt | escape }}"
        >
          <img src="{{ item.image | url_encode | prepend: '/assets/img/photography/' | relative_url }}" alt="{{ item.alt | escape }}" />
        </a>
      {% endif %}
    {% endfor %}
  </div>
{% else %}
  <p>No photos yet — add entries to <code>_data/photography.yml</code> and drop the corresponding image files into <code>assets/img/photography/</code>.</p>
{% endif %}
</div>
