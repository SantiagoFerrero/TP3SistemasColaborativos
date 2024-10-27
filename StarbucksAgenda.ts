import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import AgendaComponent from './components/AgendaComponent';
import { sp } from "@pnp/sp/presets/all";

export interface IStarbucksAgendaProps {}

export default class StarbucksAgendaWebPart extends BaseClientSideWebPart<IStarbucksAgendaProps> {

  public render(): void {
    // Configuración de PnP JS con contexto del SPFx
    sp.setup({ spfxContext: this.context });

    const element: React.ReactElement<IStarbucksAgendaProps> = React.createElement(
      AgendaComponent
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
