.section-highlight {
    animation: section-target-highlight 2.2s ease-out;
    border-radius: 0.2rem;
}

@keyframes section-target-highlight {
    0% {
        background-color: rgba(138, 10, 10, 0.35);
        box-shadow: 0 0 0 3px rgba(138, 10, 10, 0.65);
    }
    100% {
        background-color: transparent;
        box-shadow: 0 0 0 3px transparent;
    }
}

@media (prefers-reduced-motion: reduce) {
    .section-highlight {
        animation: none;
        background-color: rgba(138, 10, 10, 0.25);
        box-shadow: 0 0 0 3px rgba(138, 10, 10, 0.5);
    }
}
