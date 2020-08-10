import { Component, Input, Compiler, NgModule, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SharedModule } from '../../shared.module';

@Component({
    selector: 'html-outlet',
    template: '',

})
export class DynamicTemplateDirective {

    @Input() selector: string;
    @Input() template: string;
    // @Input() script: any;
    @Input() data: any;
    @Input() style: string;

    componentPropertyDefault = {
        handlePath(path: string = ''): string {
            const pathArray = window.location.pathname.split('/');
            path = (path) ? `/${path}` : '';
            return window.location.origin + `/${pathArray[1]}/${pathArray[2]}${path}`;
        },
        goToPage(path: string = ''): void {
            const isActualPath = this.isActualPath(path);
            if (!isActualPath) {
                window.location.href = this.handlePath(path);
            }
        },
        goPage(path: string) {
            window.location.href = window.location.origin + window.location.pathname + `/${path}`;
        },
        /*Example 
            filter(data.site.campaign, ['NORMAL'], 'featuredStatus')
        */
        filter(list: any[], columns: any, index: string) {
            return list.filter(item => columns.includes(item[index]))
        },
    }

    constructor(
        private _viewContainerRef: ViewContainerRef,
        private _compiler: Compiler) { }

    ngOnChanges() {
        const { template, selector, style } = this;

        @Component({
            selector,
            template,
            styles: [(style) ? style : ''],
            encapsulation: ViewEncapsulation.None,
        })
        class DynamicTemplateComponent { };

        @NgModule({
            imports: [CommonModule],
            declarations: [DynamicTemplateComponent]
        })
        class DynamicTemplateModule { };

        this._compiler.compileModuleAndAllComponentsAsync(DynamicTemplateModule)
            .then(factory => {
                const compFactory = factory.componentFactories.find(comp =>
                    comp.componentType === DynamicTemplateComponent);
                const componentInstance = this._viewContainerRef.createComponent(compFactory, 0);
                this.data = { ...this.data, ...this.componentPropertyDefault }
                if (this.data) {
                    const dataArray = Object.keys(this.data);
                    for (let index = 0; index < dataArray.length; index++) {
                        const item = dataArray[index];
                        componentInstance.instance[item] = this.data[item]
                    }
                }
            });
    }
}
