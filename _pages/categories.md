---
layout: default
title: Categories
permalink: /categories
---

# Categories
Browse all posts by categories.
{% assign sorted_categories = site.categories | sort %}
{% for category in sorted_categories %}
<div>
    <h3 name="{{ category | first }}">{{ category | first }}</h3>
    <ul>
    {% for post in category.last %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
    </ul>
</div>
{% endfor %}
