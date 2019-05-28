import { Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
    selector     : 'navbar',
    templateUrl  : './navbar.component.html',
    styleUrls    : ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent
{
    // Private
    _variant: string;

    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Renderer2} _renderer
     */
    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private domSanitizer: DomSanitizer,
        private matIconRegistry: MatIconRegistry
    )
    {
        // Set the private defaults
        this._variant = 'vertical-style-1';
        this.matIconRegistry.addSvgIcon('icon_p21', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/logos/p21.svg'));

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Variant
     */
    get variant(): string
    {
        return this._variant;
    }

    @Input()
    set variant(value: string)
    {
        // Remove the old class name
        this._renderer.removeClass(this._elementRef.nativeElement, this.variant);

        // Store the variant value
        this._variant = value;

        // Add the new class name
        this._renderer.addClass(this._elementRef.nativeElement, value);
    }
}
