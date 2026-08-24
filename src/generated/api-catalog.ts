// Generated from @jlceda/pro-api-types. Do not edit by hand.
export const API_CATALOG = {
	"dmt_Board": {
		"createBoard": [
			"createBoard(schematicUuid?: string, pcbUuid?: string): Promise<string | undefined>"
		],
		"modifyBoardName": [
			"modifyBoardName(originalBoardName: string, boardName: string): Promise<boolean>"
		],
		"copyBoard": [
			"copyBoard(sourceBoardName: string): Promise<string | undefined>"
		],
		"getBoardInfo": [
			"getBoardInfo(boardName: string): Promise<IDMT_BoardItem | undefined>"
		],
		"getAllBoardsInfo": [
			"getAllBoardsInfo(): Promise<Array<IDMT_BoardItem>>"
		],
		"getCurrentBoardInfo": [
			"getCurrentBoardInfo(): Promise<IDMT_BoardItem | undefined>"
		],
		"deleteBoard": [
			"deleteBoard(boardName: string): Promise<boolean>"
		]
	},
	"dmt_EditorControl": {
		"openDocument": [
			"openDocument(documentUuid: string, splitScreenId?: string): Promise<string | undefined>"
		],
		"openLibraryDocument": [
			"openLibraryDocument(libraryUuid: string, libraryType: ELIB_LibraryType.SYMBOL | ELIB_LibraryType.FOOTPRINT, uuid: string, splitScreenId?: string): Promise<string | undefined>"
		],
		"closeDocument": [
			"closeDocument(tabId: string): Promise<boolean>"
		],
		"getSplitScreenTree": [
			"getSplitScreenTree(): Promise<IDMT_EditorSplitScreenItem | undefined>"
		],
		"getSplitScreenIdByTabId": [
			"getSplitScreenIdByTabId(tabId: string): Promise<string | undefined>"
		],
		"getTabsBySplitScreenId": [
			"getTabsBySplitScreenId(splitScreenId: string): Promise<Array<IDMT_EditorTabItem>>"
		],
		"createSplitScreen": [
			"createSplitScreen(splitScreenType: EDMT_EditorSplitScreenDirection, tabId: string): Promise<{ sourceSplitScreenId: string; newSplitScreenId: string } | undefined>"
		],
		"moveDocumentToSplitScreen": [
			"moveDocumentToSplitScreen(tabId: string, splitScreenId: string): Promise<boolean>"
		],
		"activateDocument": [
			"activateDocument(tabId: string): Promise<boolean>"
		],
		"activateSplitScreen": [
			"activateSplitScreen(splitScreenId: string): Promise<boolean>"
		],
		"tileAllDocumentToSplitScreen": [
			"tileAllDocumentToSplitScreen(): Promise<boolean>"
		],
		"mergeAllDocumentFromSplitScreen": [
			"mergeAllDocumentFromSplitScreen(): Promise<boolean>"
		],
		"getCurrentRenderedAreaImage": [
			"getCurrentRenderedAreaImage(tabId?: string): Promise<Blob | undefined>"
		],
		"zoomToRegion": [
			"zoomToRegion(left: number, right: number, top: number, bottom: number, tabId?: string): Promise<boolean>"
		],
		"zoomTo": [
			"zoomTo(x?: number, y?: number, scaleRatio?: number, tabId?: string): Promise<{ left: number; right: number; top: number; bottom: number } | false>"
		],
		"zoomToAllPrimitives": [
			"zoomToAllPrimitives(tabId?: string): Promise<{ left: number; right: number; top: number; bottom: number } | false>"
		],
		"zoomToSelectedPrimitives": [
			"zoomToSelectedPrimitives(tabId?: string): Promise<{ left: number; right: number; top: number; bottom: number } | false>"
		],
		"zoom": [
			"zoom(percent: number, tabId?: string): { left: number; right: number; top: number; bottom: number } | false"
		],
		"generateIndicatorMarkers": [
			"generateIndicatorMarkers(markers: Array<IDMT_IndicatorMarkerShape>, color?: { r: number; g: number; b: number; alpha: number }, lineWidth?: number, zoom?: boolean, tabId?: string): Promise<boolean>"
		],
		"removeIndicatorMarkers": [
			"removeIndicatorMarkers(tabId?: string): Promise<boolean>"
		]
	},
	"dmt_Event": {
		"addEditorTabEventListener": [
			"addEditorTabEventListener(id: string, eventType: 'all' | EDMT_EditorTabEventType, callFn: (eventType: EDMT_EditorTabEventType, props: { documentType: EDMT_EditorDocumentType; title: string; tabId: string }) => void | Promise<void>, onlyOnce?: boolean): void"
		],
		"removeEventListener": [
			"removeEventListener(id: string): boolean"
		],
		"isEventListenerAlreadyExist": [
			"isEventListenerAlreadyExist(id: string): boolean"
		]
	},
	"dmt_Folder": {
		"createFolder": [
			"createFolder(folderName: string, teamUuid: string, parentFolderUuid?: string, description?: string): Promise<string | undefined>"
		],
		"modifyFolderName": [
			"modifyFolderName(teamUuid: string, folderUuid: string, folderName: string): Promise<boolean>"
		],
		"modifyFolderDescription": [
			"modifyFolderDescription(teamUuid: string, folderUuid: string, description?: string): Promise<boolean>"
		],
		"moveFolderToFolder": [
			"moveFolderToFolder(teamUuid: string, folderUuid: string, parentFolderUuid?: string): Promise<boolean>"
		],
		"getAllFoldersUuid": [
			"getAllFoldersUuid(teamUuid: string): Promise<Array<string>>"
		],
		"getFolderInfo": [
			"getFolderInfo(teamUuid: string, folderUuid: string): Promise<IDMT_FolderItem | undefined>"
		],
		"deleteFolder": [
			"deleteFolder(teamUuid: string, folderUuid: string): Promise<boolean>"
		]
	},
	"dmt_Panel": {
		"createPanel": [
			"createPanel(): Promise<string | undefined>"
		],
		"modifyPanelName": [
			"modifyPanelName(panelUuid: string, panelName: string): Promise<boolean>"
		],
		"copyPanel": [
			"copyPanel(panelUuid: string): Promise<string | undefined>"
		],
		"getPanelInfo": [
			"getPanelInfo(panelUuid: string): Promise<IDMT_PanelItem | undefined>"
		],
		"getAllPanelsInfo": [
			"getAllPanelsInfo(): Promise<Array<IDMT_PanelItem>>"
		],
		"getCurrentPanelInfo": [
			"getCurrentPanelInfo(): Promise<IDMT_PanelItem | undefined>"
		],
		"deletePanel": [
			"deletePanel(panelUuid: string): Promise<boolean>"
		]
	},
	"dmt_Pcb": {
		"createPcb": [
			"createPcb(boardName?: string): Promise<string | undefined>"
		],
		"modifyPcbName": [
			"modifyPcbName(pcbUuid: string, pcbName: string): Promise<boolean>"
		],
		"copyPcb": [
			"copyPcb(pcbUuid: string, boardName?: string): Promise<string | undefined>"
		],
		"getPcbInfo": [
			"getPcbInfo(pcbUuid: string): Promise<IDMT_PcbItem | undefined>"
		],
		"getAllPcbsInfo": [
			"getAllPcbsInfo(): Promise<Array<IDMT_PcbItem>>"
		],
		"getCurrentPcbInfo": [
			"getCurrentPcbInfo(): Promise<IDMT_PcbItem | undefined>"
		],
		"deletePcb": [
			"deletePcb(pcbUuid: string): Promise<boolean>"
		]
	},
	"dmt_Project": {
		"openProject": [
			"openProject(projectUuid: string): Promise<boolean>"
		],
		"createProject": [
			"createProject(projectFriendlyName: string, projectName?: string, teamUuid?: string, folderUuid?: string, description?: string, collaborationMode?: EDMT_ProjectCollaborationMode): Promise<string | undefined>"
		],
		"modifyProjectFriendlyName": [
			"modifyProjectFriendlyName(projectUuid: string, projectFriendlyName: string): boolean"
		],
		"modifyProjectDescription": [
			"modifyProjectDescription(projectUuid: string, description?: string): boolean"
		],
		"modifyProjectCollaborationMode": [
			"modifyProjectCollaborationMode(projectUuid: string, collaborationMode: EDMT_ProjectCollaborationMode): boolean"
		],
		"moveProject": [
			"moveProject(projectUuid: string, teamUuid: string, folderUuid?: string): boolean"
		],
		"moveProjectToFolder": [
			"moveProjectToFolder(projectUuid: string, folderUuid?: string): Promise<boolean>"
		],
		"copyProject": [
			"copyProject(sourceProjectUuid: string, targetTeamUuid?: string, targetFolderUuid?: string, newProjectFriendlyName?: string, newProjectName?: string): string | undefined"
		],
		"getAllProjectsUuid": [
			"getAllProjectsUuid(teamUuid?: string, folderUuid?: string, workspaceUuid?: string): Promise<Array<string>>"
		],
		"getProjectInfo": [
			"getProjectInfo(projectUuid: string): Promise<IDMT_BriefProjectItem | undefined>"
		],
		"getCurrentProjectInfo": [
			"getCurrentProjectInfo(): Promise<IDMT_ProjectItem | undefined>"
		],
		"deleteProject": [
			"deleteProject(projectUuid: string): boolean"
		]
	},
	"dmt_Schematic": {
		"createSchematic": [
			"createSchematic(boardName?: string): Promise<string | undefined>"
		],
		"createSchematicPage": [
			"createSchematicPage(schematicUuid: string): Promise<string | undefined>"
		],
		"modifySchematicName": [
			"modifySchematicName(schematicUuid: string, schematicName: string): Promise<boolean>"
		],
		"modifySchematicPageName": [
			"modifySchematicPageName(schematicPageUuid: string, schematicPageName: string): Promise<boolean>"
		],
		"modifySchematicPageTitleBlock": [
			"modifySchematicPageTitleBlock(showTitleBlock?: boolean, titleBlockData?: Record<string, { showTitle?: undefined | false | true; showValue?: undefined | false | true; value?: any }>): Promise<boolean>"
		],
		"copySchematic": [
			"copySchematic(schematicUuid: string, boardName?: string): Promise<string | undefined>"
		],
		"copySchematicPage": [
			"copySchematicPage(schematicPageUuid: string, schematicUuid?: string): Promise<string | undefined>"
		],
		"getSchematicInfo": [
			"getSchematicInfo(schematicUuid: string): Promise<IDMT_SchematicItem | undefined>"
		],
		"getSchematicPageInfo": [
			"getSchematicPageInfo(schematicPageUuid: string): Promise<IDMT_SchematicPageItem | undefined>"
		],
		"getAllSchematicsInfo": [
			"getAllSchematicsInfo(): Promise<Array<IDMT_SchematicItem>>"
		],
		"getAllSchematicPagesInfo": [
			"getAllSchematicPagesInfo(): Promise<Array<IDMT_SchematicPageItem>>"
		],
		"getCurrentSchematicAllSchematicPagesInfo": [
			"getCurrentSchematicAllSchematicPagesInfo(): Promise<Array<IDMT_SchematicPageItem>>"
		],
		"getCurrentSchematicInfo": [
			"getCurrentSchematicInfo(): Promise<IDMT_SchematicItem | undefined>"
		],
		"getCurrentSchematicPageInfo": [
			"getCurrentSchematicPageInfo(): Promise<IDMT_SchematicPageItem | undefined>"
		],
		"reorderSchematicPages": [
			"reorderSchematicPages(schematicUuid: string, schematicPageItemsArray: Array<IDMT_SchematicPageItem>): Promise<boolean>"
		],
		"deleteSchematic": [
			"deleteSchematic(schematicUuid: string): Promise<boolean>"
		],
		"deleteSchematicPage": [
			"deleteSchematicPage(schematicPageUuid: string): Promise<boolean>"
		]
	},
	"dmt_SelectControl": {
		"getCurrentDocumentInfo": [
			"getCurrentDocumentInfo(): Promise<IDMT_EditorDocumentItem | undefined>"
		]
	},
	"dmt_Team": {
		"getAllTeamsInfo": [
			"getAllTeamsInfo(): Promise<Array<IDMT_TeamItem>>"
		],
		"getAllInvolvedTeamInfo": [
			"getAllInvolvedTeamInfo(): Promise<Array<IDMT_TeamItem>>"
		],
		"getCurrentTeamInfo": [
			"getCurrentTeamInfo(): Promise<IDMT_TeamItem | undefined>"
		]
	},
	"dmt_Workspace": {
		"getAllWorkspacesInfo": [
			"getAllWorkspacesInfo(): Promise<Array<IDMT_WorkspaceItem>>"
		],
		"toggleToWorkspace": [
			"toggleToWorkspace(workspaceUuid?: string): Promise<boolean>"
		],
		"getCurrentWorkspaceInfo": [
			"getCurrentWorkspaceInfo(): Promise<IDMT_WorkspaceItem | undefined>"
		]
	},
	"lib_3DModel": {
		"create": [
			"create(libraryUuid: string, modelFile: Blob, classification?: ILIB_ClassificationIndex | Array<string>, unit?: ESYS_Unit.MILLIMETER | ESYS_Unit.CENTIMETER | ESYS_Unit.METER | ESYS_Unit.MIL | ESYS_Unit.INCH): Promise<Array<string> | undefined>"
		],
		"delete": [
			"delete(modelUuid: string, libraryUuid: string): Promise<boolean>"
		],
		"modify": [
			"modify(modelUuid: string, libraryUuid: string, modelName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, description?: string | null): Promise<boolean>"
		],
		"get": [
			"get(modelUuid: string, libraryUuid?: string): Promise<ILIB_3DModelItem | undefined>"
		],
		"copy": [
			"copy(modelUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newModelName?: string): Promise<string | undefined>"
		],
		"search": [
			"search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, itemsOfPage?: number, page?: number): Promise<Array<ILIB_3DModelSearchItem>>"
		]
	},
	"lib_Cbb": {
		"create": [
			"create(libraryUuid: string, cbbName: string, classification?: ILIB_ClassificationIndex | Array<string>, description?: string): Promise<string | undefined>"
		],
		"delete": [
			"delete(cbbUuid: string, libraryUuid: string): Promise<boolean>"
		],
		"modify": [
			"modify(cbbUuid: string, libraryUuid: string, cbbName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, description?: string | null): Promise<boolean>"
		],
		"get": [
			"get(cbbUuid: string, libraryUuid?: string): Promise<ILIB_CbbItem | undefined>"
		],
		"copy": [
			"copy(cbbUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newCbbName?: string): Promise<string | undefined>"
		],
		"search": [
			"search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, itemsOfPage?: number, page?: number): Promise<Array<ILIB_CbbSearchItem>>"
		],
		"openProjectInEditor": [
			"openProjectInEditor(cbbUuid: string, libraryUuid: string): Promise<boolean>"
		],
		"openSymbolInEditor": [
			"openSymbolInEditor(cbbUuid: string, libraryUuid: string, splitScreenId?: string): Promise<string | undefined>"
		]
	},
	"lib_Classification": {
		"createPrimary": [
			"createPrimary(libraryUuid: string, libraryType: ELIB_LibraryType, primaryClassificationName: string): Promise<ILIB_ClassificationIndex | undefined>"
		],
		"createSecondary": [
			"createSecondary(libraryUuid: string, libraryType: ELIB_LibraryType, primaryClassificationUuid: string, secondaryClassificationName: string): Promise<ILIB_ClassificationIndex | undefined>"
		],
		"getIndexByName": [
			"getIndexByName(libraryUuid: string, libraryType: ELIB_LibraryType, primaryClassificationName: string, secondaryClassificationName?: string): Promise<ILIB_ClassificationIndex | undefined>"
		],
		"getNameByUuid": [
			"getNameByUuid(libraryUuid: string, libraryType: ELIB_LibraryType, primaryClassificationUuid: string, secondaryClassificationUuid?: string): Promise<{ primaryClassificationName: string; secondaryClassificationName?: undefined | string } | undefined>"
		],
		"getNameByIndex": [
			"getNameByIndex(classificationIndex: ILIB_ClassificationIndex): Promise<{ primaryClassificationName: string; secondaryClassificationName?: undefined | string } | undefined>"
		],
		"getAllClassificationTree": [
			"getAllClassificationTree(libraryUuid: string, libraryType: ELIB_LibraryType): Promise<Array<{ name: string; uuid: string; children?: undefined | { name: string; uuid: string }[] }>>"
		],
		"deleteByUuid": [
			"deleteByUuid(libraryUuid: string, classificationUuid: string): Promise<boolean>"
		],
		"deleteByIndex": [
			"deleteByIndex(classificationIndex: ILIB_ClassificationIndex): Promise<boolean>"
		]
	},
	"lib_Device": {
		"create": [
			"create(libraryUuid: string, deviceName: string, classification?: ILIB_ClassificationIndex | Array<string>, association?: { symbolType?: undefined | ELIB_SymbolType.COMPONENT | ELIB_SymbolType.NET_FLAG | ELIB_SymbolType.NET_PORT | ELIB_SymbolType.DRAWING | ELIB_SymbolType.NON_ELECTRICAL | ELIB_SymbolType.SHORT_CIRCUIT_FLAG | ELIB_SymbolType.OFF_PAGE_CONNECTOR | ELIB_SymbolType.DIFFERENTIAL_PAIRS_FLAG | ELIB_SymbolType.CBB_SYMBOL; symbolUuid?: undefined | string; symbol?: undefined | { uuid: string; libraryUuid: string }; footprintUuid?: undefined | string; footprint?: undefined | { uuid: string; libraryUuid: string }; model3D?: undefined | { uuid: string; libraryUuid: string }; imageData?: undefined | File | Blob }, description?: string, property?: ILIB_DeviceExtendPropertyItem): Promise<string | undefined>"
		],
		"delete": [
			"delete(deviceUuid: string, libraryUuid: string): Promise<boolean>"
		],
		"modify": [
			"modify(deviceUuid: string, libraryUuid: string, deviceName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, association?: { symbolUuid?: undefined | string; symbol?: undefined | { uuid: string; libraryUuid: string }; footprintUuid?: undefined | null | string; footprint?: undefined | null | { uuid: string; libraryUuid: string }; model3D?: undefined | null | { uuid: string; libraryUuid: string }; imageData?: undefined | null | File | Blob }, description?: string | null, property?: { name?: undefined | null | string; designator?: undefined | string; addIntoBom?: undefined | false | true; addIntoPcb?: undefined | false | true; net?: undefined | string; manufacturer?: undefined | null | string; manufacturerId?: undefined | null | string; supplier?: undefined | null | string; supplierId?: undefined | null | string; otherProperty?: undefined | Record<string, undefined | null | string | number | false | true> }): Promise<boolean>"
		],
		"get": [
			"get(deviceUuid: string, libraryUuid?: string): Promise<ILIB_DeviceItem | undefined>"
		],
		"copy": [
			"copy(deviceUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newDeviceName?: string): Promise<string | undefined>"
		],
		"search": [
			"search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, symbolType?: ELIB_SymbolType, itemsOfPage?: number, page?: number): Promise<Array<ILIB_DeviceSearchItem>>"
		],
		"searchByProperties": [
			"searchByProperties(properties: ILIB_DevicePropertiesForSearch, libraryUuid?: string, classification?: Array<string>, symbolType?: ELIB_SymbolType, itemsOfPage?: number, page?: number): Promise<Array<ILIB_DeviceSearchItem>>"
		],
		"getByLcscIds": [
			"getByLcscIds(lcscIds: string, libraryUuid?: string, allowMultiMatch?: T): Promise<T extends true ? ILIB_DeviceSearchItem | undefined : Array<ILIB_DeviceSearchItem>>",
			"getByLcscIds(lcscIds: Array<string>, libraryUuid?: string, allowMultiMatch?: boolean): Promise<Array<ILIB_DeviceSearchItem>>"
		]
	},
	"lib_Footprint": {
		"create": [
			"create(libraryUuid: string, footprintName: string, classification?: ILIB_ClassificationIndex | Array<string>, description?: string): Promise<string | undefined>"
		],
		"delete": [
			"delete(footprintUuid: string, libraryUuid: string): Promise<boolean>"
		],
		"modify": [
			"modify(footprintUuid: string, libraryUuid: string, footprintName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, description?: string | null): Promise<boolean>"
		],
		"updateDocumentSource": [
			"updateDocumentSource(footprintUuid: string, libraryUuid: string, documentSource: string): Promise<boolean | undefined>"
		],
		"get": [
			"get(footprintUuid: string, libraryUuid?: string): Promise<ILIB_FootprintItem | undefined>"
		],
		"copy": [
			"copy(footprintUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newFootprintName?: string): Promise<string | undefined>"
		],
		"search": [
			"search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, itemsOfPage?: number, page?: number): Promise<Array<ILIB_FootprintSearchItem>>"
		],
		"searchByProperties": [
			"searchByProperties(properties: ILIB_FootprintPropertiesForSearch, libraryUuid?: string): Promise<Array<ILIB_FootprintSearchItem>>"
		],
		"openInEditor": [
			"openInEditor(footprintUuid: string, libraryUuid: string, splitScreenId?: string): Promise<string | undefined>"
		],
		"getRenderImage": [
			"getRenderImage(source: { footprintUuid: string; libraryUuid: string }): Promise<Blob | undefined>"
		]
	},
	"lib_LibrariesList": {
		"getSystemLibraryUuid": [
			"getSystemLibraryUuid(): Promise<string | undefined>"
		],
		"getPersonalLibraryUuid": [
			"getPersonalLibraryUuid(): Promise<string | undefined>"
		],
		"getProjectLibraryUuid": [
			"getProjectLibraryUuid(): Promise<string | undefined>"
		],
		"getFavoriteLibraryUuid": [
			"getFavoriteLibraryUuid(): Promise<string | undefined>"
		],
		"getAllLibrariesList": [
			"getAllLibrariesList(): Promise<Array<ILIB_LibraryInfo>>"
		],
		"registerExtendLibrary": [
			"registerExtendLibrary(title: string, libraryFunctions: { device?: undefined | ILIB_ExtendLibraryDeviceFunctions; symbol?: undefined | ILIB_ExtendLibrarySymbolFunctions; footprint?: undefined | ILIB_ExtendLibraryFootprintFunctions; cbb?: undefined | ILIB_ExtendLibraryCbbFunctions; model3d?: undefined | ILIB_ExtendLibrary3DModelFunctions }): Promise<string | undefined>"
		]
	},
	"lib_PanelLibrary": {
		"create": [
			"create(libraryUuid: string, panelLibraryName: string, classification?: ILIB_ClassificationIndex | Array<string>, description?: string): Promise<string | undefined>"
		],
		"delete": [
			"delete(panelLibraryUuid: string, libraryUuid: string): Promise<boolean>"
		],
		"modify": [
			"modify(panelLibraryUuid: string, libraryUuid: string, panelLibraryName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, description?: string | null): Promise<boolean>"
		],
		"get": [
			"get(panelLibraryUuid: string, libraryUuid?: string): Promise<ILIB_PanelLibraryItem | undefined>"
		],
		"copy": [
			"copy(panelLibraryUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newPanelLibraryName?: string): Promise<string | undefined>"
		],
		"search": [
			"search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, itemsOfPage?: number, page?: number): Promise<Array<ILIB_PanelLibrarySearchItem>>"
		],
		"openInEditor": [
			"openInEditor(panelLibraryUuid: string, libraryUuid: string, splitScreenId?: string): Promise<string | undefined>"
		]
	},
	"lib_SelectControl": {
		"getSelectedLibraryRowInfo": [
			"getSelectedLibraryRowInfo(): Promise<ILIB_LibraryItem | undefined>"
		]
	},
	"lib_SimulationModel": {
		"create": [
			"create(libraryUuid: string, model: { modelType: 'Ngspice' } & ({ modelFile: Blob; modelName?: undefined | string; modelCategory?: undefined | string; modelPin?: undefined | string } | { modelData: string; modelName?: undefined | string; modelCategory?: undefined | string; modelPin?: undefined | string }), classification?: Array<string>, description?: string): Promise<string | undefined>"
		],
		"delete": [
			"delete(simulationModelUuid: string, libraryUuid: string): Promise<boolean>"
		],
		"modify": [
			"modify(simulationModelUuid: string, libraryUuid: string, modelProps?: { modelName?: undefined | string; modelCategory?: undefined | string; modelPin?: undefined | string }, classification?: Array<string> | null, description?: string | null): Promise<boolean>"
		],
		"get": [
			"get(simulationModelUuid: string, libraryUuid?: string): Promise<ILIB_SimulationModelItem | undefined>"
		],
		"copy": [
			"copy(simulationModelUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: Array<string>, newSimulationModelName?: string): Promise<string | undefined>"
		],
		"search": [
			"search(key: string, libraryUuid?: string, classification?: Array<string>, simulationModelType?: ELIB_SimulationModelType, itemsOfPage?: number, page?: number): Promise<Array<ILIB_SimulationModelSearchItem>>"
		]
	},
	"lib_Symbol": {
		"create": [
			"create(libraryUuid: string, symbolName: string, classification?: ILIB_ClassificationIndex | Array<string>, symbolType?: ELIB_SymbolType, description?: string): Promise<string | undefined>"
		],
		"delete": [
			"delete(symbolUuid: string, libraryUuid: string): Promise<boolean>"
		],
		"modify": [
			"modify(symbolUuid: string, libraryUuid: string, symbolName?: string, classification?: ILIB_ClassificationIndex | Array<string> | null, description?: string | null): Promise<boolean>"
		],
		"updateDocumentSource": [
			"updateDocumentSource(symbolUuid: string, libraryUuid: string, documentSource: string): Promise<boolean | undefined>"
		],
		"get": [
			"get(symbolUuid: string, libraryUuid?: string): Promise<ILIB_SymbolItem | undefined>"
		],
		"copy": [
			"copy(symbolUuid: string, libraryUuid: string, targetLibraryUuid: string, targetClassification?: ILIB_ClassificationIndex | Array<string>, newSymbolName?: string): Promise<string | undefined>"
		],
		"search": [
			"search(key: string, libraryUuid?: string, classification?: ILIB_ClassificationIndex | Array<string>, symbolType?: ELIB_SymbolType, itemsOfPage?: number, page?: number): Promise<Array<ILIB_SymbolSearchItem>>"
		],
		"searchByProperties": [
			"searchByProperties(properties: ILIB_SymbolPropertiesForSearch, libraryUuid?: string): Promise<Array<ILIB_SymbolSearchItem>>"
		],
		"openInEditor": [
			"openInEditor(symbolUuid: string, libraryUuid: string, splitScreenId?: string): Promise<string | undefined>"
		],
		"getRenderImage": [
			"getRenderImage(source: { symbolUuid: string; libraryUuid: string; subPartName?: undefined | string }): Promise<Blob | undefined>"
		]
	},
	"pcb_Document": {
		"importChanges": [
			"importChanges(uuid?: string): Promise<boolean>"
		],
		"importAutoRouteJsonFile": [
			"importAutoRouteJsonFile(autoRouteFile: File): Promise<boolean>"
		],
		"importAutoRouteSesFile": [
			"importAutoRouteSesFile(autoRouteFile: File): Promise<boolean>"
		],
		"importAutoLayoutJsonFile": [
			"importAutoLayoutJsonFile(autoLayoutFile: File): Promise<boolean>"
		],
		"save": [
			"save(): Promise<boolean>"
		],
		"getCalculatingRatlineStatus": [
			"getCalculatingRatlineStatus(): Promise<EPCB_DocumentRatlineCalculatingActiveStatus | undefined>"
		],
		"startCalculatingRatline": [
			"startCalculatingRatline(): Promise<boolean>"
		],
		"stopCalculatingRatline": [
			"stopCalculatingRatline(): Promise<boolean>"
		],
		"startCanvasUpdateCalculation": [
			"startCanvasUpdateCalculation(): Promise<boolean>"
		],
		"stopCanvasUpdateCalculation": [
			"stopCanvasUpdateCalculation(): Promise<boolean>"
		],
		"getCanvasUpdateCalculationStatus": [
			"getCanvasUpdateCalculationStatus(): Promise<EPCB_DocumentCanvasUpdateCalculationActiveStatus | undefined>"
		],
		"triggerCanvasUpdateCalculation": [
			"triggerCanvasUpdateCalculation(): Promise<boolean>"
		],
		"convertCanvasOriginToDataOrigin": [
			"convertCanvasOriginToDataOrigin(x: number, y: number): Promise<{ x: number; y: number }>"
		],
		"convertDataOriginToCanvasOrigin": [
			"convertDataOriginToCanvasOrigin(x: number, y: number): Promise<{ x: number; y: number }>"
		],
		"getCanvasOrigin": [
			"getCanvasOrigin(): Promise<{ offsetX: number; offsetY: number }>"
		],
		"setCanvasOrigin": [
			"setCanvasOrigin(offsetX: number, offsetY: number): Promise<boolean>"
		],
		"navigateToCoordinates": [
			"navigateToCoordinates(x: number, y: number): Promise<boolean>"
		],
		"navigateToRegion": [
			"navigateToRegion(left: number, right: number, top: number, bottom: number): Promise<boolean>"
		],
		"getPrimitiveAtPoint": [
			"getPrimitiveAtPoint(x: number, y: number): Promise<IPCB_Primitive | undefined>"
		],
		"getPrimitivesInRegion": [
			"getPrimitivesInRegion(left: number, right: number, top: number, bottom: number, leftToRight?: boolean): Promise<Array<IPCB_Primitive>>"
		],
		"zoomToBoardOutline": [
			"zoomToBoardOutline(): Promise<boolean>"
		],
		"getCurrentFilterConfiguration": [
			"getCurrentFilterConfiguration(): Promise<Record<string, any> | undefined>"
		],
		"clearRouting": [
			"clearRouting(type?: 'all' | 'net' | 'connection'): Promise<boolean>"
		],
		"autoRouting": [
			"autoRouting(props?: IPCB_AutoRoutingProps): Promise<IPCB_AutoRoutingResult>"
		],
		"autoLayout": [
			"autoLayout(): Promise<IPCB_AutoLayoutResult>"
		]
	},
	"pcb_Drc": {
		"check": [
			"check(strict: boolean, userInterface: boolean, includeVerboseError: false): Promise<boolean>",
			"check(strict: boolean, userInterface: boolean, includeVerboseError: true): Promise<Array<any>>"
		],
		"getRealTimeDrcStatus": [
			"getRealTimeDrcStatus(): Promise<boolean>"
		],
		"startRealTimeDrc": [
			"startRealTimeDrc(): Promise<boolean>"
		],
		"stopRealTimeDrc": [
			"stopRealTimeDrc(): Promise<boolean>"
		],
		"getCurrentRuleConfigurationName": [
			"getCurrentRuleConfigurationName(): Promise<string | undefined>"
		],
		"getCurrentRuleConfiguration": [
			"getCurrentRuleConfiguration(): Promise<Record<string, any> | undefined>"
		],
		"getRuleConfiguration": [
			"getRuleConfiguration(configurationName: string): Promise<Record<string, any> | undefined>"
		],
		"getAllRuleConfigurations": [
			"getAllRuleConfigurations(includeSystem?: boolean): Promise<Array<Record<string, any>>>"
		],
		"saveRuleConfiguration": [
			"saveRuleConfiguration(ruleConfiguration: Record<string, any>, configurationName: string, allowOverwrite?: boolean): Promise<boolean>"
		],
		"renameRuleConfiguration": [
			"renameRuleConfiguration(originalConfigurationName: string, configurationName: string): Promise<boolean>"
		],
		"deleteRuleConfiguration": [
			"deleteRuleConfiguration(configurationName: string): Promise<boolean>"
		],
		"getDefaultRuleConfigurationName": [
			"getDefaultRuleConfigurationName(): Promise<string | undefined>"
		],
		"setAsDefaultRuleConfiguration": [
			"setAsDefaultRuleConfiguration(configurationName: string): Promise<boolean>"
		],
		"overwriteCurrentRuleConfiguration": [
			"overwriteCurrentRuleConfiguration(ruleConfiguration: Record<string, any>): Promise<boolean>"
		],
		"getNetRules": [
			"getNetRules(): Promise<Array<Record<string, any>>>"
		],
		"overwriteNetRules": [
			"overwriteNetRules(netRules: Array<Record<string, any>>): Promise<boolean>"
		],
		"getNetByNetRules": [
			"getNetByNetRules(): Promise<Record<string, any>>"
		],
		"overwriteNetByNetRules": [
			"overwriteNetByNetRules(netByNetRules: Record<string, any>): Promise<boolean>"
		],
		"getRegionRules": [
			"getRegionRules(): Promise<Array<Record<string, any>>>"
		],
		"overwriteRegionRules": [
			"overwriteRegionRules(regionRules: Array<Record<string, any>>): Promise<boolean>"
		],
		"createNetClass": [
			"createNetClass(netClassName: string, nets: Array<string>, color: IPCB_EqualLengthNetGroupItem['color']): Promise<boolean>"
		],
		"deleteNetClass": [
			"deleteNetClass(netClassName: string): Promise<boolean>"
		],
		"modifyNetClassName": [
			"modifyNetClassName(originalNetClassName: string, netClassName: string): Promise<boolean>"
		],
		"addNetToNetClass": [
			"addNetToNetClass(netClassName: string, net: string | Array<string>): Promise<boolean>"
		],
		"removeNetFromNetClass": [
			"removeNetFromNetClass(netClassName: string, net: string | Array<string>): Promise<boolean>"
		],
		"getAllNetClasses": [
			"getAllNetClasses(): Promise<Array<IPCB_NetClassItem>>"
		],
		"createDifferentialPair": [
			"createDifferentialPair(differentialPairName: string, positiveNet: string, negativeNet: string): Promise<boolean>"
		],
		"deleteDifferentialPair": [
			"deleteDifferentialPair(differentialPairName: string): Promise<boolean>"
		],
		"modifyDifferentialPairName": [
			"modifyDifferentialPairName(originalDifferentialPairName: string, differentialPairName: string): Promise<boolean>"
		],
		"modifyDifferentialPairPositiveNet": [
			"modifyDifferentialPairPositiveNet(differentialPairName: string, positiveNet: string): Promise<boolean>"
		],
		"modifyDifferentialPairNegativeNet": [
			"modifyDifferentialPairNegativeNet(differentialPairName: string, negativeNet: string): Promise<boolean>"
		],
		"getAllDifferentialPairs": [
			"getAllDifferentialPairs(): Promise<Array<IPCB_DifferentialPairItem> | Record<string, any>>"
		],
		"createEqualLengthNetGroup": [
			"createEqualLengthNetGroup(equalLengthNetGroupName: string, nets: Array<string>, color: IPCB_EqualLengthNetGroupItem['color']): Promise<boolean>"
		],
		"deleteEqualLengthNetGroup": [
			"deleteEqualLengthNetGroup(equalLengthNetGroupName: string): Promise<boolean>"
		],
		"modifyEqualLengthNetGroupName": [
			"modifyEqualLengthNetGroupName(originalEqualLengthNetGroupName: string, equalLengthNetGroupName: string): Promise<boolean>"
		],
		"addNetToEqualLengthNetGroup": [
			"addNetToEqualLengthNetGroup(equalLengthNetGroupName: string, net: string | Array<string>): Promise<boolean>"
		],
		"removeNetFromEqualLengthNetGroup": [
			"removeNetFromEqualLengthNetGroup(equalLengthNetGroupName: string, net: string | Array<string>): Promise<boolean>"
		],
		"getAllEqualLengthNetGroups": [
			"getAllEqualLengthNetGroups(): Promise<Array<IPCB_EqualLengthNetGroupItem>>"
		],
		"createPadPairGroup": [
			"createPadPairGroup(padPairGroupName: string, padPairs: Array<[string, string]>): Promise<boolean>"
		],
		"deletePadPairGroup": [
			"deletePadPairGroup(padPairGroupName: string): Promise<boolean>"
		],
		"modifyPadPairGroupName": [
			"modifyPadPairGroupName(originalPadPairGroupName: string, padPairGroupName: string): Promise<boolean>"
		],
		"addPadPairToPadPairGroup": [
			"addPadPairToPadPairGroup(padPairGroupName: string, padPair: [string, string] | Array<[string, string]>): Promise<boolean>"
		],
		"removePadPairFromPadPairGroup": [
			"removePadPairFromPadPairGroup(padPairGroupName: string, padPair: [string, string] | Array<[string, string]>): Promise<boolean>"
		],
		"getAllPadPairGroups": [
			"getAllPadPairGroups(): Promise<Array<IPCB_PadPairGroupItem>>"
		],
		"getPadPairGroupMinWireLength": [
			"getPadPairGroupMinWireLength(padPairGroupName: string): Promise<Array<IPCB_PadPairMinWireLengthItem>>"
		]
	},
	"pcb_Event": {
		"addMouseEventListener": [
			"addMouseEventListener(id: string, eventType: 'all' | EPCB_MouseEventType, callFn: (eventType: EPCB_MouseEventType, props: [{ primitiveId: string; primitiveType: EPCB_PrimitiveType; net?: undefined | string; designator?: undefined | string; parentComponentPrimitiveId?: undefined | string; parentComponentDesignator?: undefined | string }]) => void | Promise<void>, onlyOnce?: boolean): void"
		],
		"addPrimitiveEventListener": [
			"addPrimitiveEventListener(id: string, eventType: 'all' | EPCB_PrimitiveEventType, callFn: (eventType: EPCB_PrimitiveEventType, props: [{ primitiveId: string; primitiveType: EPCB_PrimitiveType; net?: undefined | string; designator?: undefined | string; parentComponentPrimitiveId?: undefined | string; parentComponentDesignator?: undefined | string }]) => void | Promise<void>, onlyOnce?: boolean): void"
		],
		"addNetEventListener": [
			"addNetEventListener(id: string, eventType: 'all' | EPCB_NetEventType, callFn: (eventType: EPCB_NetEventType, props: [{ net: string }]) => void | Promise<void>, onlyOnce?: boolean): void"
		],
		"addCrossProbeSelectEventListener": [
			"addCrossProbeSelectEventListener(id: string, callFn: (props: any) => void | Promise<void>): void"
		],
		"addRealTimeDrcResultEventListener": [
			"addRealTimeDrcResultEventListener(id: string, eventType: 'all', callFn: (eventType: undefined, props: [{ drcResult: any }]) => void | Promise<void>): void"
		],
		"addRayTracerEngine3DViewClickMaterialEventListener": [
			"addRayTracerEngine3DViewClickMaterialEventListener(id: string, callFn: (props: { materialId: number; material: any }) => void | Promise<void>, onlyOnce?: boolean): void"
		],
		"addRayTracerEngine3DViewCameraChangeEventListener": [
			"addRayTracerEngine3DViewCameraChangeEventListener(id: string, callFn: (props: { position: { x: number; y: number; z: number }; rotation: { x: number; y: number; z: number }; focalLength: number }) => void | Promise<void>, onlyOnce?: boolean): void"
		],
		"removeEventListener": [
			"removeEventListener(id: string): boolean"
		],
		"isEventListenerAlreadyExist": [
			"isEventListenerAlreadyExist(id: string): boolean"
		]
	},
	"pcb_Layer": {
		"getCurrentLayer": [
			"getCurrentLayer(): Promise<IPCB_LayerItem | undefined>"
		],
		"selectLayer": [
			"selectLayer(layer: TPCB_LayersInTheSelectable): Promise<boolean>"
		],
		"setLayerVisible": [
			"setLayerVisible(layer?: TPCB_LayersInTheSelectable | Array<TPCB_LayersInTheSelectable>, setOtherLayerInvisible?: boolean): Promise<boolean>"
		],
		"setLayerInvisible": [
			"setLayerInvisible(layer?: TPCB_LayersInTheSelectable | Array<TPCB_LayersInTheSelectable>, setOtherLayerVisible?: boolean): Promise<boolean>"
		],
		"lockLayer": [
			"lockLayer(layer?: TPCB_LayersInTheSelectable | Array<TPCB_LayersInTheSelectable>): Promise<boolean>"
		],
		"unlockLayer": [
			"unlockLayer(layer?: TPCB_LayersInTheSelectable | Array<TPCB_LayersInTheSelectable>): Promise<boolean>"
		],
		"setTheNumberOfCopperLayers": [
			"setTheNumberOfCopperLayers(numberOfLayers: TPCB_NumberOfCopperLayers): Promise<boolean>"
		],
		"getTheNumberOfCopperLayers": [
			"getTheNumberOfCopperLayers(): Promise<number>"
		],
		"setLayerColorConfiguration": [
			"setLayerColorConfiguration(colorConfiguration: EPCB_LayerColorConfiguration): Promise<boolean>"
		],
		"setInactiveLayerTransparency": [
			"setInactiveLayerTransparency(transparency: number): Promise<boolean>"
		],
		"setPcbType": [
			"setPcbType(pcbType: EPCB_PcbPlateType): Promise<boolean>"
		],
		"addCustomLayer": [
			"addCustomLayer(): Promise<TPCB_LayersOfCustom | undefined>"
		],
		"removeLayer": [
			"removeLayer(layer: TPCB_LayersOfCustom): Promise<boolean>"
		],
		"modifyLayer": [
			"modifyLayer(layer: TPCB_LayersInTheSelectable, property: { name?: undefined | string; type?: undefined | EPCB_LayerType.SIGNAL | EPCB_LayerType.INTERNAL_ELECTRICAL; color?: undefined | string; transparency?: undefined | number }): Promise<boolean>"
		],
		"getAllLayers": [
			"getAllLayers(): Promise<Array<IPCB_LayerItem>>"
		],
		"setInactiveLayerDisplayMode": [
			"setInactiveLayerDisplayMode(displayMode?: EPCB_InactiveLayerDisplayMode): Promise<boolean>"
		],
		"getCurrentPhysicalStackingConfigurationName": [
			"getCurrentPhysicalStackingConfigurationName(): Promise<string | undefined>"
		],
		"getCurrentPhysicalStackingConfiguration": [
			"getCurrentPhysicalStackingConfiguration(): Promise<IPCB_PhysicalStackingConfiguration | undefined>"
		],
		"getPhysicalStackingConfiguration": [
			"getPhysicalStackingConfiguration(configurationName: string, physicalProps?: IPCB_SubstratePhysicalProperties): Promise<IPCB_PhysicalStackingConfiguration | undefined>"
		],
		"getAllPhysicalStackingConfigurations": [
			"getAllPhysicalStackingConfigurations(physicalProps?: IPCB_SubstratePhysicalProperties): Promise<Array<IPCB_PhysicalStackingConfiguration>>"
		],
		"savePhysicalStackingConfiguration": [
			"savePhysicalStackingConfiguration(physicalStackingConfiguration: IPCB_PhysicalStackingConfiguration, configurationName: string, physicalProps?: IPCB_SubstratePhysicalProperties, allowOverwrite?: boolean): Promise<boolean>"
		],
		"renamePhysicalStackingConfiguration": [
			"renamePhysicalStackingConfiguration(originalConfigurationName: string, configurationName: string, physicalProps?: IPCB_SubstratePhysicalProperties): Promise<boolean>"
		],
		"deletePhysicalStackingConfiguration": [
			"deletePhysicalStackingConfiguration(configurationName: string, physicalProps?: IPCB_SubstratePhysicalProperties): Promise<boolean>"
		],
		"getDefaultPhysicalStackingConfigurationName": [
			"getDefaultPhysicalStackingConfigurationName(physicalProps?: IPCB_SubstratePhysicalProperties): Promise<string | undefined>"
		],
		"setAsDefaultPhysicalStackingConfiguration": [
			"setAsDefaultPhysicalStackingConfiguration(configurationName: string, physicalProps?: IPCB_SubstratePhysicalProperties): Promise<boolean>"
		],
		"overwriteCurrentPhysicalStackingConfiguration": [
			"overwriteCurrentPhysicalStackingConfiguration(physicalStackingConfiguration: IPCB_PhysicalStackingConfiguration): Promise<boolean>"
		]
	},
	"pcb_ManufactureData": {
		"getGerberFile": [
			"getGerberFile(fileName?: string, colorSilkscreen?: boolean, unit?: ESYS_Unit.MILLIMETER | ESYS_Unit.INCH, digitalFormat?: { integerNumber: number; decimalNumber: number }, other?: { metallicDrillingInformation: boolean; nonMetallicDrillingInformation: boolean; drillTable: boolean; flyingProbeTestingFile: boolean }, layers?: Array<{ layerId: EPCB_LayerId; isMirror: boolean }>, objects?: Array<'Pad' | 'Via' | 'Track' | 'Text' | 'Image' | 'Dimension' | 'BoardOutline' | 'BoardCutout' | 'CopperFilled' | 'SolidRegion' | 'FPCStiffener' | 'Line' | 'PlaneZone' | 'ComponentProperty' | 'ComponentSilkscreen' | 'TearDrop'>): Promise<File | undefined>"
		],
		"get3DFile": [
			"get3DFile(fileName?: string, fileType?: 'step' | 'obj', element?: Array<'Component Model' | 'Via' | 'Silkscreen' | 'Wire In Signal Layer'>, modelMode?: 'Outfit' | 'Parts', autoGenerateModels?: boolean): Promise<File | undefined>"
		],
		"get3DShellFile": [
			"get3DShellFile(fileName?: string, fileType?: 'stl' | 'step' | 'obj'): Promise<File | undefined>"
		],
		"getPickAndPlaceFile": [
			"getPickAndPlaceFile(fileName?: string, fileType?: 'xlsx' | 'csv', unit?: ESYS_Unit.MILLIMETER | ESYS_Unit.MIL): Promise<File | undefined>"
		],
		"getFlyingProbeTestFile": [
			"getFlyingProbeTestFile(fileName?: string): Promise<File | undefined>"
		],
		"getBomTemplates": [
			"getBomTemplates(): Promise<Array<string>>"
		],
		"uploadBomTemplateFile": [
			"uploadBomTemplateFile(templateFile: File, template?: string): Promise<string | undefined>"
		],
		"getBomTemplateFile": [
			"getBomTemplateFile(template: string): Promise<File | undefined>"
		],
		"deleteBomTemplate": [
			"deleteBomTemplate(template: string): Promise<boolean>"
		],
		"getBomFile": [
			"getBomFile(fileName?: string, fileType?: 'xlsx' | 'csv', template?: string, filterOptions?: Array<{ property: string; includeValue: string | false | true }>, statistics?: Array<string>, property?: Array<string>, columns?: Array<IPCB_BomPropertiesTableColumns>): Promise<File | undefined>"
		],
		"getTestPointFile": [
			"getTestPointFile(fileName?: string, fileType?: 'xlsx' | 'csv'): Promise<File | undefined>"
		],
		"getNetlistFile": [
			"getNetlistFile(fileName?: string, netlistType?: ESYS_NetlistType): Promise<File | undefined>"
		],
		"getDxfFile": [
			"getDxfFile(fileName?: string, layers?: Array<{ layerId: EPCB_LayerId; mirror: boolean }>, objects?: Array<string>): Promise<File | undefined>"
		],
		"getPdfFile": [
			"getPdfFile(fileName?: string, outputMethod?: EPCB_PdfOutputMethod, contentConfig?: { displayAttributesAsMenu: boolean; showOutlineOnly: boolean }, watermark?: { show?: undefined | false | true; content?: undefined | string; styleConfig?: undefined | { color: string; transparency: 'Opaque' | '75%' | '50%' | '25%'; font: string; fontSize: { unit: ESYS_Unit.MILLIMETER | ESYS_Unit.INCH | ESYS_Unit.MIL; value: number }; style: { bold: boolean; italic: boolean; underline: boolean }; slope: 0 | 45 | 90; denseness: 'Single' | 'Sparse' | 'Std' | 'Dense' } }, graphPageConfig?: Array<Record<string, any>>): Promise<File | undefined>"
		],
		"getIpcD356AFile": [
			"getIpcD356AFile(fileName?: string): Promise<File | undefined>"
		],
		"getIpc2581CFile": [
			"getIpc2581CFile(fileName?: string, fileType?: 'xml' | 'cvg' | '2581', unit?: ESYS_Unit.INCH | ESYS_Unit.MILLIMETER, oemNumber?: 'Device' | 'Manufacturer Part' | 'Supplier Part' | 'Comment'): Promise<File | undefined>"
		],
		"getOpenDatabaseDoublePlusFile": [
			"getOpenDatabaseDoublePlusFile(fileName?: string, unit?: ESYS_Unit.INCH | ESYS_Unit.MILLIMETER, otherData?: { metallizedDrilledHoles?: undefined | false | true; nonMetallizedDrilledHoles?: undefined | false | true; drillTable?: undefined | false | true; flyingProbeTestFile?: undefined | false | true }, layers?: Array<{ layerId: EPCB_LayerId; mirror: boolean }>, objects?: Array<{ objectName: string }>): Promise<File | undefined>"
		],
		"getInteractiveBomFile": [
			"getInteractiveBomFile(fileName?: string): Promise<File | undefined>"
		],
		"getDsnFile": [
			"getDsnFile(fileName?: string): Promise<File | undefined>"
		],
		"getAutoRouteJsonFile": [
			"getAutoRouteJsonFile(fileName?: string): Promise<File | undefined>"
		],
		"getAutoRouteJsonFileForJRouter": [
			"getAutoRouteJsonFileForJRouter(fileName?: string): Promise<File | undefined>"
		],
		"getAutoLayoutJsonFile": [
			"getAutoLayoutJsonFile(fileName?: string): Promise<File | undefined>"
		],
		"getAltiumDesignerFile": [
			"getAltiumDesignerFile(fileName?: string): Promise<File | undefined>"
		],
		"getPadsFile": [
			"getPadsFile(fileName?: string): Promise<File | undefined>"
		],
		"getPcbInfoFile": [
			"getPcbInfoFile(fileName?: string): Promise<File | undefined>"
		],
		"getIdxFile": [
			"getIdxFile(fileName?: string): Promise<File | undefined>"
		],
		"placeComponentsOrder": [
			"placeComponentsOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>"
		],
		"placeSmtComponentsOrder": [
			"placeSmtComponentsOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>"
		],
		"placePcbOrder": [
			"placePcbOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>"
		],
		"place3DShellOrder": [
			"place3DShellOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>"
		],
		"getManufactureData": [
			"getManufactureData(): Promise<File | undefined>"
		]
	},
	"pcb_MathPolygon": {
		"createPolygon": [
			"createPolygon(polygon: TPCB_PolygonSourceArray): IPCB_Polygon | undefined"
		],
		"createComplexPolygon": [
			"createComplexPolygon(complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray> | IPCB_Polygon | Array<IPCB_Polygon>): IPCB_ComplexPolygon | undefined"
		],
		"splitPolygon": [
			"splitPolygon(...complexPolygons: Array<IPCB_ComplexPolygon>): Array<IPCB_Polygon>"
		],
		"discretize": [
			"discretize(polygon: IPCB_Polygon | TPCB_PolygonSourceArray, options?: IPCB_DiscretizeOptions): Promise<Array<IPCB_DiscretizedPoint>>"
		],
		"calculateWidth": [
			"calculateWidth(complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray> | IPCB_Polygon | IPCB_ComplexPolygon): number"
		],
		"calculateHeight": [
			"calculateHeight(complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray> | IPCB_Polygon | IPCB_ComplexPolygon): number"
		],
		"calculateBBoxHeight": [
			"calculateBBoxHeight(complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray>): number"
		],
		"convertImageToComplexPolygon": [
			"convertImageToComplexPolygon(imageBlob: Blob, imageWidth: number, imageHeight: number, tolerance?: number, simplification?: number, smoothing?: number, despeckling?: number, whiteAsBackgroundColor?: boolean, inversion?: boolean): Promise<IPCB_ComplexPolygon | undefined>"
		],
		"calculateBBoxWidth": [
			"calculateBBoxWidth(complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray>): number"
		]
	},
	"pcb_Net": {
		"getAllNets": [
			"getAllNets(): Promise<Array<IPCB_NetInfo>>"
		],
		"getNet": [
			"getNet(net: string): Promise<IPCB_NetInfo | undefined>"
		],
		"getAllNetsName": [
			"getAllNetsName(): Promise<Array<string>>"
		],
		"getAllNetName": [
			"getAllNetName(): Promise<Array<string>>"
		],
		"getNetLength": [
			"getNetLength(net: string): Promise<number | undefined>"
		],
		"getNetColor": [
			"getNetColor(net: string): Promise<IPCB_NetInfo['color'] | undefined>"
		],
		"setNetColor": [
			"setNetColor(net: string, color: IPCB_NetInfo['color']): Promise<boolean>"
		],
		"getAllPrimitivesByNet": [
			"getAllPrimitivesByNet(net: string, primitiveTypes?: Array<EPCB_PrimitiveType>): Promise<Array<IPCB_Primitive>>"
		],
		"selectNet": [
			"selectNet(net: string): Promise<boolean>"
		],
		"unselectNet": [
			"unselectNet(net: string): Promise<boolean>"
		],
		"unselectAllNets": [
			"unselectAllNets(): Promise<boolean>"
		],
		"highlightNet": [
			"highlightNet(net: string): Promise<boolean>"
		],
		"unhighlightNet": [
			"unhighlightNet(net: string): Promise<boolean>"
		],
		"unhighlightAllNets": [
			"unhighlightAllNets(): Promise<boolean>"
		],
		"getNetlist": [
			"getNetlist(type?: ESYS_NetlistType): Promise<string>"
		],
		"setNetlist": [
			"setNetlist(type: ESYS_NetlistType | undefined, netlist: string): Promise<boolean>"
		]
	},
	"pcb_Primitive": {
		"getPrimitiveTypeByPrimitiveId": [
			"getPrimitiveTypeByPrimitiveId(id: string): Promise<EPCB_PrimitiveType | undefined>"
		],
		"getPrimitiveByPrimitiveId": [
			"getPrimitiveByPrimitiveId(id: string): Promise<IPCB_Primitive | undefined>"
		],
		"getPrimitivesByPrimitiveId": [
			"getPrimitivesByPrimitiveId(ids: Array<string>): Promise<Array<IPCB_Primitive>>"
		],
		"getPrimitivesBBox": [
			"getPrimitivesBBox(primitiveIds: Array<string | IPCB_Primitive>): Promise<{ minX: number; minY: number; maxX: number; maxY: number } | undefined>"
		],
		"getPrimitiveBoardLine": [
			"getPrimitiveBoardLine(primitiveId: string, layers?: Array<EPCB_LayerId>): Promise<IPCB_ComplexPolygon | undefined>"
		]
	},
	"pcb_PrimitiveArc": {
		"create": [
			"create(net: string, layer: TPCB_LayersOfLine, startX: number, startY: number, endX: number, endY: number, arcAngle: number, lineWidth?: number, interactiveMode?: EPCB_PrimitiveArcInteractiveMode, primitiveLock?: boolean): Promise<IPCB_PrimitiveArc | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitiveArc | Array<string> | Array<IPCB_PrimitiveArc>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitiveArc, property: { net?: undefined | string; layer?: undefined | EPCB_LayerId.TOP | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_PASTE_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_PASTE_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.BOARD_OUTLINE | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.INNER_1 | EPCB_LayerId.INNER_2 | EPCB_LayerId.INNER_3 | EPCB_LayerId.INNER_4 | EPCB_LayerId.INNER_5 | EPCB_LayerId.INNER_6 | EPCB_LayerId.INNER_7 | EPCB_LayerId.INNER_8 | EPCB_LayerId.INNER_9 | EPCB_LayerId.INNER_10 | EPCB_LayerId.INNER_11 | EPCB_LayerId.INNER_12 | EPCB_LayerId.INNER_13 | EPCB_LayerId.INNER_14 | EPCB_LayerId.INNER_15 | EPCB_LayerId.INNER_16 | EPCB_LayerId.INNER_17 | EPCB_LayerId.INNER_18 | EPCB_LayerId.INNER_19 | EPCB_LayerId.INNER_20 | EPCB_LayerId.INNER_21 | EPCB_LayerId.INNER_22 | EPCB_LayerId.INNER_23 | EPCB_LayerId.INNER_24 | EPCB_LayerId.INNER_25 | EPCB_LayerId.INNER_26 | EPCB_LayerId.INNER_27 | EPCB_LayerId.INNER_28 | EPCB_LayerId.INNER_29 | EPCB_LayerId.INNER_30 | EPCB_LayerId.CUSTOM_1 | EPCB_LayerId.CUSTOM_2 | EPCB_LayerId.CUSTOM_3 | EPCB_LayerId.CUSTOM_4 | EPCB_LayerId.CUSTOM_5 | EPCB_LayerId.CUSTOM_6 | EPCB_LayerId.CUSTOM_7 | EPCB_LayerId.CUSTOM_8 | EPCB_LayerId.CUSTOM_9 | EPCB_LayerId.CUSTOM_10 | EPCB_LayerId.CUSTOM_11 | EPCB_LayerId.CUSTOM_12 | EPCB_LayerId.CUSTOM_13 | EPCB_LayerId.CUSTOM_14 | EPCB_LayerId.CUSTOM_15 | EPCB_LayerId.CUSTOM_16 | EPCB_LayerId.CUSTOM_17 | EPCB_LayerId.CUSTOM_18 | EPCB_LayerId.CUSTOM_19 | EPCB_LayerId.CUSTOM_20 | EPCB_LayerId.CUSTOM_21 | EPCB_LayerId.CUSTOM_22 | EPCB_LayerId.CUSTOM_23 | EPCB_LayerId.CUSTOM_24 | EPCB_LayerId.CUSTOM_25 | EPCB_LayerId.CUSTOM_26 | EPCB_LayerId.CUSTOM_27 | EPCB_LayerId.CUSTOM_28 | EPCB_LayerId.CUSTOM_29 | EPCB_LayerId.CUSTOM_30 | EPCB_LayerId.DRILL_DRAWING; startX?: undefined | number; startY?: undefined | number; endX?: undefined | number; endY?: undefined | number; arcAngle?: undefined | number; lineWidth?: undefined | number; interactiveMode?: undefined | EPCB_PrimitiveArcInteractiveMode.TWO_POINT_ARC | EPCB_PrimitiveArcInteractiveMode.CENTER_ARC; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitiveArc | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitiveArc | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveArc>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveArc>>"
		]
	},
	"pcb_PrimitiveAttribute": {
		"create": [
			"create(): undefined"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitiveAttribute | Array<string> | Array<IPCB_PrimitiveAttribute>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitiveAttribute, property: { layer?: undefined | EPCB_LayerId.TOP | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.INNER_1 | EPCB_LayerId.INNER_2 | EPCB_LayerId.INNER_3 | EPCB_LayerId.INNER_4 | EPCB_LayerId.INNER_5 | EPCB_LayerId.INNER_6 | EPCB_LayerId.INNER_7 | EPCB_LayerId.INNER_8 | EPCB_LayerId.INNER_9 | EPCB_LayerId.INNER_10 | EPCB_LayerId.INNER_11 | EPCB_LayerId.INNER_12 | EPCB_LayerId.INNER_13 | EPCB_LayerId.INNER_14 | EPCB_LayerId.INNER_15 | EPCB_LayerId.INNER_16 | EPCB_LayerId.INNER_17 | EPCB_LayerId.INNER_18 | EPCB_LayerId.INNER_19 | EPCB_LayerId.INNER_20 | EPCB_LayerId.INNER_21 | EPCB_LayerId.INNER_22 | EPCB_LayerId.INNER_23 | EPCB_LayerId.INNER_24 | EPCB_LayerId.INNER_25 | EPCB_LayerId.INNER_26 | EPCB_LayerId.INNER_27 | EPCB_LayerId.INNER_28 | EPCB_LayerId.INNER_29 | EPCB_LayerId.INNER_30 | EPCB_LayerId.CUSTOM_1 | EPCB_LayerId.CUSTOM_2 | EPCB_LayerId.CUSTOM_3 | EPCB_LayerId.CUSTOM_4 | EPCB_LayerId.CUSTOM_5 | EPCB_LayerId.CUSTOM_6 | EPCB_LayerId.CUSTOM_7 | EPCB_LayerId.CUSTOM_8 | EPCB_LayerId.CUSTOM_9 | EPCB_LayerId.CUSTOM_10 | EPCB_LayerId.CUSTOM_11 | EPCB_LayerId.CUSTOM_12 | EPCB_LayerId.CUSTOM_13 | EPCB_LayerId.CUSTOM_14 | EPCB_LayerId.CUSTOM_15 | EPCB_LayerId.CUSTOM_16 | EPCB_LayerId.CUSTOM_17 | EPCB_LayerId.CUSTOM_18 | EPCB_LayerId.CUSTOM_19 | EPCB_LayerId.CUSTOM_20 | EPCB_LayerId.CUSTOM_21 | EPCB_LayerId.CUSTOM_22 | EPCB_LayerId.CUSTOM_23 | EPCB_LayerId.CUSTOM_24 | EPCB_LayerId.CUSTOM_25 | EPCB_LayerId.CUSTOM_26 | EPCB_LayerId.CUSTOM_27 | EPCB_LayerId.CUSTOM_28 | EPCB_LayerId.CUSTOM_29 | EPCB_LayerId.CUSTOM_30 | EPCB_LayerId.DRILL_DRAWING; x?: undefined | number; y?: undefined | number; key?: undefined | string; value?: undefined | string; keyVisible?: undefined | false | true; valueVisible?: undefined | false | true; fontFamily?: undefined | string; fontSize?: undefined | number; lineWidth?: undefined | number; alignMode?: undefined | EPCB_PrimitiveStringAlignMode.LEFT_TOP | EPCB_PrimitiveStringAlignMode.LEFT_MIDDLE | EPCB_PrimitiveStringAlignMode.LEFT_BOTTOM | EPCB_PrimitiveStringAlignMode.CENTER_TOP | EPCB_PrimitiveStringAlignMode.CENTER | EPCB_PrimitiveStringAlignMode.CENTER_BOTTOM | EPCB_PrimitiveStringAlignMode.RIGHT_TOP | EPCB_PrimitiveStringAlignMode.RIGHT_MIDDLE | EPCB_PrimitiveStringAlignMode.RIGHT_BOTTOM; rotation?: undefined | number; reverse?: undefined | false | true; expansion?: undefined | number; mirror?: undefined | false | true; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitiveAttribute | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitiveAttribute | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveAttribute>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(parentPrimitiveId?: string, layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(parentPrimitiveId?: string, layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveAttribute>>"
		]
	},
	"pcb_PrimitiveComponent": {
		"create": [
			"create(component: { libraryUuid: string; uuid: string } | ILIB_DeviceItem | ILIB_DeviceSearchItem | { libraryType: ELIB_LibraryType.FOOTPRINT; libraryUuid: string; uuid: string } | ILIB_FootprintItem | ILIB_FootprintSearchItem, layer: TPCB_LayersOfComponent, x: number, y: number, rotation?: number, primitiveLock?: boolean): Promise<IPCB_PrimitiveComponent | undefined>"
		],
		"placeCbbPcb": [
			"placeCbbPcb(cbbPcb: { libraryUuid: string; cbbUuid: string; uuid: string }, x: number, y: number, props?: { reimportWhenNameRepeated?: undefined | false | true }): Promise<boolean>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitiveComponent | Array<string> | Array<IPCB_PrimitiveComponent>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitiveComponent, property: { layer?: undefined | EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM; x?: undefined | number; y?: undefined | number; rotation?: undefined | number; primitiveLock?: undefined | false | true; addIntoBom?: undefined | false | true; designator?: undefined | null | string; name?: undefined | null | string; uniqueId?: undefined | null | string; manufacturer?: undefined | null | string; manufacturerId?: undefined | null | string; supplier?: undefined | null | string; supplierId?: undefined | null | string; otherProperty?: undefined | Record<string, any> }): Promise<IPCB_PrimitiveComponent | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitiveComponent | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveComponent>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(layer?: TPCB_LayersOfComponent, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(layer?: TPCB_LayersOfComponent, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveComponent>>"
		],
		"getAllPinsByPrimitiveId": [
			"getAllPinsByPrimitiveId(primitiveId: string): Promise<Array<IPCB_PrimitiveComponentPad> | undefined>"
		],
		"placeComponentWithMouse": [
			"placeComponentWithMouse(component: { libraryUuid: string; uuid: string } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>"
		],
		"placeFootprintWithMouse": [
			"placeFootprintWithMouse(footprint: { libraryUuid: string; uuid: string } | ILIB_FootprintItem | ILIB_FootprintSearchItem, properties?: Record<string, boolean | number | string | undefined>): Promise<boolean>"
		],
		"getAllPropertyNames": [
			"getAllPropertyNames(): Promise<Array<string>>"
		]
	},
	"pcb_PrimitiveDimension": {
		"create": [
			"create(dimensionType: EPCB_PrimitiveDimensionType, coordinateSet: TPCB_PrimitiveDimensionCoordinateSet, layer?: TPCB_LayersOfDimension, unit?: ESYS_Unit.MILLIMETER | ESYS_Unit.CENTIMETER | ESYS_Unit.INCH | ESYS_Unit.MIL, lineWidth?: number, precision?: number, primitiveLock?: boolean): Promise<IPCB_PrimitiveDimension | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitiveDimension | Array<string> | Array<IPCB_PrimitiveDimension>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitiveDimension, property: { dimensionType?: undefined | EPCB_PrimitiveDimensionType.RADIUS | EPCB_PrimitiveDimensionType.LENGTH | EPCB_PrimitiveDimensionType.ANGLE; coordinateSet?: undefined | any | any; layer?: undefined | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.CUSTOM_1 | EPCB_LayerId.CUSTOM_2 | EPCB_LayerId.CUSTOM_3 | EPCB_LayerId.CUSTOM_4 | EPCB_LayerId.CUSTOM_5 | EPCB_LayerId.CUSTOM_6 | EPCB_LayerId.CUSTOM_7 | EPCB_LayerId.CUSTOM_8 | EPCB_LayerId.CUSTOM_9 | EPCB_LayerId.CUSTOM_10 | EPCB_LayerId.CUSTOM_11 | EPCB_LayerId.CUSTOM_12 | EPCB_LayerId.CUSTOM_13 | EPCB_LayerId.CUSTOM_14 | EPCB_LayerId.CUSTOM_15 | EPCB_LayerId.CUSTOM_16 | EPCB_LayerId.CUSTOM_17 | EPCB_LayerId.CUSTOM_18 | EPCB_LayerId.CUSTOM_19 | EPCB_LayerId.CUSTOM_20 | EPCB_LayerId.CUSTOM_21 | EPCB_LayerId.CUSTOM_22 | EPCB_LayerId.CUSTOM_23 | EPCB_LayerId.CUSTOM_24 | EPCB_LayerId.CUSTOM_25 | EPCB_LayerId.CUSTOM_26 | EPCB_LayerId.CUSTOM_27 | EPCB_LayerId.CUSTOM_28 | EPCB_LayerId.CUSTOM_29 | EPCB_LayerId.CUSTOM_30; unit?: undefined | ESYS_Unit.MILLIMETER | ESYS_Unit.CENTIMETER | ESYS_Unit.INCH | ESYS_Unit.MIL; lineWidth?: undefined | number; precision?: undefined | number; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitiveDimension | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitiveDimension | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveDimension>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(layer?: TPCB_LayersOfDimension, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(layer?: TPCB_LayersOfDimension, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveDimension>>"
		]
	},
	"pcb_PrimitiveFill": {
		"create": [
			"create(layer: TPCB_LayersOfFill, complexPolygon: IPCB_Polygon, net?: string, fillMode?: EPCB_PrimitiveFillMode, lineWidth?: number, primitiveLock?: boolean): Promise<IPCB_PrimitiveFill | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitiveFill | Array<string> | Array<IPCB_PrimitiveFill>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitiveFill, property: { layer?: undefined | EPCB_LayerId.TOP | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_PASTE_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_PASTE_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.MULTI | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.INNER_1 | EPCB_LayerId.INNER_2 | EPCB_LayerId.INNER_3 | EPCB_LayerId.INNER_4 | EPCB_LayerId.INNER_5 | EPCB_LayerId.INNER_6 | EPCB_LayerId.INNER_7 | EPCB_LayerId.INNER_8 | EPCB_LayerId.INNER_9 | EPCB_LayerId.INNER_10 | EPCB_LayerId.INNER_11 | EPCB_LayerId.INNER_12 | EPCB_LayerId.INNER_13 | EPCB_LayerId.INNER_14 | EPCB_LayerId.INNER_15 | EPCB_LayerId.INNER_16 | EPCB_LayerId.INNER_17 | EPCB_LayerId.INNER_18 | EPCB_LayerId.INNER_19 | EPCB_LayerId.INNER_20 | EPCB_LayerId.INNER_21 | EPCB_LayerId.INNER_22 | EPCB_LayerId.INNER_23 | EPCB_LayerId.INNER_24 | EPCB_LayerId.INNER_25 | EPCB_LayerId.INNER_26 | EPCB_LayerId.INNER_27 | EPCB_LayerId.INNER_28 | EPCB_LayerId.INNER_29 | EPCB_LayerId.INNER_30 | EPCB_LayerId.CUSTOM_1 | EPCB_LayerId.CUSTOM_2 | EPCB_LayerId.CUSTOM_3 | EPCB_LayerId.CUSTOM_4 | EPCB_LayerId.CUSTOM_5 | EPCB_LayerId.CUSTOM_6 | EPCB_LayerId.CUSTOM_7 | EPCB_LayerId.CUSTOM_8 | EPCB_LayerId.CUSTOM_9 | EPCB_LayerId.CUSTOM_10 | EPCB_LayerId.CUSTOM_11 | EPCB_LayerId.CUSTOM_12 | EPCB_LayerId.CUSTOM_13 | EPCB_LayerId.CUSTOM_14 | EPCB_LayerId.CUSTOM_15 | EPCB_LayerId.CUSTOM_16 | EPCB_LayerId.CUSTOM_17 | EPCB_LayerId.CUSTOM_18 | EPCB_LayerId.CUSTOM_19 | EPCB_LayerId.CUSTOM_20 | EPCB_LayerId.CUSTOM_21 | EPCB_LayerId.CUSTOM_22 | EPCB_LayerId.CUSTOM_23 | EPCB_LayerId.CUSTOM_24 | EPCB_LayerId.CUSTOM_25 | EPCB_LayerId.CUSTOM_26 | EPCB_LayerId.CUSTOM_27 | EPCB_LayerId.CUSTOM_28 | EPCB_LayerId.CUSTOM_29 | EPCB_LayerId.CUSTOM_30; complexPolygon?: undefined | IPCB_Polygon; net?: undefined | string; fillMode?: undefined | EPCB_PrimitiveFillMode.SOLID | EPCB_PrimitiveFillMode.MESH | EPCB_PrimitiveFillMode.INNER_ELECTRICAL_LAYER; lineWidth?: undefined | number; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitiveFill | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitiveFill | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveFill>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(layer?: TPCB_LayersOfFill, net?: string, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(layer?: TPCB_LayersOfFill, net?: string, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveFill>>"
		]
	},
	"pcb_PrimitiveImage": {
		"create": [
			"create(x: number, y: number, complexPolygon: TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray> | IPCB_Polygon | IPCB_ComplexPolygon, layer: TPCB_LayersOfImage, width?: number, height?: number, rotation?: number, horizonMirror?: boolean, primitiveLock?: boolean): Promise<IPCB_PrimitiveImage | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitiveImage | Array<string> | Array<IPCB_PrimitiveImage>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitiveImage, property: { x?: undefined | number; y?: undefined | number; layer?: undefined | EPCB_LayerId.TOP | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.INNER_1 | EPCB_LayerId.INNER_2 | EPCB_LayerId.INNER_3 | EPCB_LayerId.INNER_4 | EPCB_LayerId.INNER_5 | EPCB_LayerId.INNER_6 | EPCB_LayerId.INNER_7 | EPCB_LayerId.INNER_8 | EPCB_LayerId.INNER_9 | EPCB_LayerId.INNER_10 | EPCB_LayerId.INNER_11 | EPCB_LayerId.INNER_12 | EPCB_LayerId.INNER_13 | EPCB_LayerId.INNER_14 | EPCB_LayerId.INNER_15 | EPCB_LayerId.INNER_16 | EPCB_LayerId.INNER_17 | EPCB_LayerId.INNER_18 | EPCB_LayerId.INNER_19 | EPCB_LayerId.INNER_20 | EPCB_LayerId.INNER_21 | EPCB_LayerId.INNER_22 | EPCB_LayerId.INNER_23 | EPCB_LayerId.INNER_24 | EPCB_LayerId.INNER_25 | EPCB_LayerId.INNER_26 | EPCB_LayerId.INNER_27 | EPCB_LayerId.INNER_28 | EPCB_LayerId.INNER_29 | EPCB_LayerId.INNER_30 | EPCB_LayerId.CUSTOM_1 | EPCB_LayerId.CUSTOM_2 | EPCB_LayerId.CUSTOM_3 | EPCB_LayerId.CUSTOM_4 | EPCB_LayerId.CUSTOM_5 | EPCB_LayerId.CUSTOM_6 | EPCB_LayerId.CUSTOM_7 | EPCB_LayerId.CUSTOM_8 | EPCB_LayerId.CUSTOM_9 | EPCB_LayerId.CUSTOM_10 | EPCB_LayerId.CUSTOM_11 | EPCB_LayerId.CUSTOM_12 | EPCB_LayerId.CUSTOM_13 | EPCB_LayerId.CUSTOM_14 | EPCB_LayerId.CUSTOM_15 | EPCB_LayerId.CUSTOM_16 | EPCB_LayerId.CUSTOM_17 | EPCB_LayerId.CUSTOM_18 | EPCB_LayerId.CUSTOM_19 | EPCB_LayerId.CUSTOM_20 | EPCB_LayerId.CUSTOM_21 | EPCB_LayerId.CUSTOM_22 | EPCB_LayerId.CUSTOM_23 | EPCB_LayerId.CUSTOM_24 | EPCB_LayerId.CUSTOM_25 | EPCB_LayerId.CUSTOM_26 | EPCB_LayerId.CUSTOM_27 | EPCB_LayerId.CUSTOM_28 | EPCB_LayerId.CUSTOM_29 | EPCB_LayerId.CUSTOM_30 | EPCB_LayerId.DRILL_DRAWING; width?: undefined | number; height?: undefined | number; rotation?: undefined | number; horizonMirror?: undefined | false | true; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitiveImage | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitiveImage | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveImage>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveImage>>"
		]
	},
	"pcb_PrimitiveLine": {
		"create": [
			"create(net: string, layer: TPCB_LayersOfLine, startX: number, startY: number, endX: number, endY: number, lineWidth?: number, primitiveLock?: boolean): Promise<IPCB_PrimitiveLine | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitiveLine | Array<string> | Array<IPCB_PrimitiveLine>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitiveLine, property: { net?: undefined | string; layer?: undefined | EPCB_LayerId.TOP | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_PASTE_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_PASTE_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.BOARD_OUTLINE | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.INNER_1 | EPCB_LayerId.INNER_2 | EPCB_LayerId.INNER_3 | EPCB_LayerId.INNER_4 | EPCB_LayerId.INNER_5 | EPCB_LayerId.INNER_6 | EPCB_LayerId.INNER_7 | EPCB_LayerId.INNER_8 | EPCB_LayerId.INNER_9 | EPCB_LayerId.INNER_10 | EPCB_LayerId.INNER_11 | EPCB_LayerId.INNER_12 | EPCB_LayerId.INNER_13 | EPCB_LayerId.INNER_14 | EPCB_LayerId.INNER_15 | EPCB_LayerId.INNER_16 | EPCB_LayerId.INNER_17 | EPCB_LayerId.INNER_18 | EPCB_LayerId.INNER_19 | EPCB_LayerId.INNER_20 | EPCB_LayerId.INNER_21 | EPCB_LayerId.INNER_22 | EPCB_LayerId.INNER_23 | EPCB_LayerId.INNER_24 | EPCB_LayerId.INNER_25 | EPCB_LayerId.INNER_26 | EPCB_LayerId.INNER_27 | EPCB_LayerId.INNER_28 | EPCB_LayerId.INNER_29 | EPCB_LayerId.INNER_30 | EPCB_LayerId.CUSTOM_1 | EPCB_LayerId.CUSTOM_2 | EPCB_LayerId.CUSTOM_3 | EPCB_LayerId.CUSTOM_4 | EPCB_LayerId.CUSTOM_5 | EPCB_LayerId.CUSTOM_6 | EPCB_LayerId.CUSTOM_7 | EPCB_LayerId.CUSTOM_8 | EPCB_LayerId.CUSTOM_9 | EPCB_LayerId.CUSTOM_10 | EPCB_LayerId.CUSTOM_11 | EPCB_LayerId.CUSTOM_12 | EPCB_LayerId.CUSTOM_13 | EPCB_LayerId.CUSTOM_14 | EPCB_LayerId.CUSTOM_15 | EPCB_LayerId.CUSTOM_16 | EPCB_LayerId.CUSTOM_17 | EPCB_LayerId.CUSTOM_18 | EPCB_LayerId.CUSTOM_19 | EPCB_LayerId.CUSTOM_20 | EPCB_LayerId.CUSTOM_21 | EPCB_LayerId.CUSTOM_22 | EPCB_LayerId.CUSTOM_23 | EPCB_LayerId.CUSTOM_24 | EPCB_LayerId.CUSTOM_25 | EPCB_LayerId.CUSTOM_26 | EPCB_LayerId.CUSTOM_27 | EPCB_LayerId.CUSTOM_28 | EPCB_LayerId.CUSTOM_29 | EPCB_LayerId.CUSTOM_30 | EPCB_LayerId.DRILL_DRAWING; startX?: undefined | number; startY?: undefined | number; endX?: undefined | number; endY?: undefined | number; lineWidth?: undefined | number; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitiveLine | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitiveLine | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveLine>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveLine>>"
		]
	},
	"pcb_PrimitiveObject": {
		"create": [
			"create(layer: TPCB_LayersOfObject, topLeftX: number, topLeftY: number, binaryData: string, width: number, height: number, rotation?: number, mirror?: boolean, fileName?: string, primitiveLock?: boolean): Promise<IPCB_PrimitiveObject | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitiveObject | Array<string> | Array<IPCB_PrimitiveObject>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitiveObject, property: { layer?: undefined | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.DOCUMENT; topLeftX?: undefined | number; topLeftY?: undefined | number; binaryData?: undefined | string; width?: undefined | number; height?: undefined | number; rotation?: undefined | number; mirror?: undefined | false | true; fileName?: undefined | string; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitiveObject | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitiveObject | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveObject>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(layer?: TPCB_LayersOfObject, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(layer?: TPCB_LayersOfObject, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveObject>>"
		]
	},
	"pcb_PrimitivePad": {
		"create": [
			"create(layer: TPCB_LayersOfPad, padNumber: string, x: number, y: number, rotation?: number, pad?: TPCB_PrimitivePadShape, net?: string, hole?: TPCB_PrimitivePadHole | null, holeOffsetX?: number, holeOffsetY?: number, holeRotation?: number, metallization?: boolean, padType?: EPCB_PrimitivePadType, specialPad?: TPCB_PrimitiveSpecialPadShape, solderMaskAndPasteMaskExpansion?: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null, heatWelding?: IPCB_PrimitivePadHeatWelding | null, primitiveLock?: boolean): Promise<IPCB_PrimitivePad | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitivePad | Array<string> | Array<IPCB_PrimitivePad>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitivePad, property: { layer?: undefined | EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM | EPCB_LayerId.MULTI; padNumber?: undefined | string; x?: undefined | number; y?: undefined | number; rotation?: undefined | number; pad?: undefined | any | any | any; net?: undefined | string; hole?: undefined | null | any | any; holeOffsetX?: undefined | number; holeOffsetY?: undefined | number; holeRotation?: undefined | number; metallization?: undefined | false | true; specialPad?: undefined | TPCB_PrimitiveSpecialPadShape; solderMaskAndPasteMaskExpansion?: undefined | null | IPCB_PrimitiveSolderMaskAndPasteMaskExpansion; heatWelding?: undefined | null | IPCB_PrimitivePadHeatWelding; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitivePad | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitivePad | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitivePad>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(layer?: TPCB_LayersOfPad, net?: string, primitiveLock?: boolean, padType?: EPCB_PrimitivePadType): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(layer?: TPCB_LayersOfPad, net?: string, primitiveLock?: boolean, padType?: EPCB_PrimitivePadType): Promise<Array<IPCB_PrimitivePad>>"
		]
	},
	"pcb_PrimitivePolyline": {
		"create": [
			"create(net: string, layer: TPCB_LayersOfLine, polygon: IPCB_Polygon, lineWidth?: number, primitiveLock?: boolean): Promise<IPCB_PrimitivePolyline | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitivePolyline | Array<string> | Array<IPCB_PrimitivePolyline>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitivePolyline, property: { net?: undefined | string; layer?: undefined | EPCB_LayerId.TOP | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_PASTE_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_PASTE_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.BOARD_OUTLINE | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.INNER_1 | EPCB_LayerId.INNER_2 | EPCB_LayerId.INNER_3 | EPCB_LayerId.INNER_4 | EPCB_LayerId.INNER_5 | EPCB_LayerId.INNER_6 | EPCB_LayerId.INNER_7 | EPCB_LayerId.INNER_8 | EPCB_LayerId.INNER_9 | EPCB_LayerId.INNER_10 | EPCB_LayerId.INNER_11 | EPCB_LayerId.INNER_12 | EPCB_LayerId.INNER_13 | EPCB_LayerId.INNER_14 | EPCB_LayerId.INNER_15 | EPCB_LayerId.INNER_16 | EPCB_LayerId.INNER_17 | EPCB_LayerId.INNER_18 | EPCB_LayerId.INNER_19 | EPCB_LayerId.INNER_20 | EPCB_LayerId.INNER_21 | EPCB_LayerId.INNER_22 | EPCB_LayerId.INNER_23 | EPCB_LayerId.INNER_24 | EPCB_LayerId.INNER_25 | EPCB_LayerId.INNER_26 | EPCB_LayerId.INNER_27 | EPCB_LayerId.INNER_28 | EPCB_LayerId.INNER_29 | EPCB_LayerId.INNER_30 | EPCB_LayerId.CUSTOM_1 | EPCB_LayerId.CUSTOM_2 | EPCB_LayerId.CUSTOM_3 | EPCB_LayerId.CUSTOM_4 | EPCB_LayerId.CUSTOM_5 | EPCB_LayerId.CUSTOM_6 | EPCB_LayerId.CUSTOM_7 | EPCB_LayerId.CUSTOM_8 | EPCB_LayerId.CUSTOM_9 | EPCB_LayerId.CUSTOM_10 | EPCB_LayerId.CUSTOM_11 | EPCB_LayerId.CUSTOM_12 | EPCB_LayerId.CUSTOM_13 | EPCB_LayerId.CUSTOM_14 | EPCB_LayerId.CUSTOM_15 | EPCB_LayerId.CUSTOM_16 | EPCB_LayerId.CUSTOM_17 | EPCB_LayerId.CUSTOM_18 | EPCB_LayerId.CUSTOM_19 | EPCB_LayerId.CUSTOM_20 | EPCB_LayerId.CUSTOM_21 | EPCB_LayerId.CUSTOM_22 | EPCB_LayerId.CUSTOM_23 | EPCB_LayerId.CUSTOM_24 | EPCB_LayerId.CUSTOM_25 | EPCB_LayerId.CUSTOM_26 | EPCB_LayerId.CUSTOM_27 | EPCB_LayerId.CUSTOM_28 | EPCB_LayerId.CUSTOM_29 | EPCB_LayerId.CUSTOM_30 | EPCB_LayerId.DRILL_DRAWING; polygon?: undefined | IPCB_Polygon; lineWidth?: undefined | number; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitivePolyline | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitivePolyline | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitivePolyline>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(net?: string, layer?: TPCB_LayersOfLine, primitiveLock?: boolean): Promise<Array<IPCB_PrimitivePolyline>>"
		]
	},
	"pcb_PrimitivePour": {
		"create": [
			"create(net: string, layer: TPCB_LayersOfCopper, complexPolygon: IPCB_Polygon, pourFillMethod?: EPCB_PrimitivePourFillMethod, preserveSilos?: boolean, pourName?: string, pourPriority?: number, lineWidth?: number, primitiveLock?: boolean): Promise<IPCB_PrimitivePour | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitivePour | Array<string> | Array<IPCB_PrimitivePour>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitivePour, property: { net?: undefined | string; layer?: undefined | EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM | EPCB_LayerId.INNER_1 | EPCB_LayerId.INNER_2 | EPCB_LayerId.INNER_3 | EPCB_LayerId.INNER_4 | EPCB_LayerId.INNER_5 | EPCB_LayerId.INNER_6 | EPCB_LayerId.INNER_7 | EPCB_LayerId.INNER_8 | EPCB_LayerId.INNER_9 | EPCB_LayerId.INNER_10 | EPCB_LayerId.INNER_11 | EPCB_LayerId.INNER_12 | EPCB_LayerId.INNER_13 | EPCB_LayerId.INNER_14 | EPCB_LayerId.INNER_15 | EPCB_LayerId.INNER_16 | EPCB_LayerId.INNER_17 | EPCB_LayerId.INNER_18 | EPCB_LayerId.INNER_19 | EPCB_LayerId.INNER_20 | EPCB_LayerId.INNER_21 | EPCB_LayerId.INNER_22 | EPCB_LayerId.INNER_23 | EPCB_LayerId.INNER_24 | EPCB_LayerId.INNER_25 | EPCB_LayerId.INNER_26 | EPCB_LayerId.INNER_27 | EPCB_LayerId.INNER_28 | EPCB_LayerId.INNER_29 | EPCB_LayerId.INNER_30; complexPolygon?: undefined | IPCB_Polygon; pourFillMethod?: undefined | EPCB_PrimitivePourFillMethod.GRID45 | EPCB_PrimitivePourFillMethod.GRID | EPCB_PrimitivePourFillMethod.SOLID; preserveSilos?: undefined | false | true; pourName?: undefined | string; pourPriority?: undefined | number; lineWidth?: undefined | number; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitivePour | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitivePour | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitivePour>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(net?: string, layer?: TPCB_LayersOfCopper, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(net?: string, layer?: TPCB_LayersOfCopper, primitiveLock?: boolean): Promise<Array<IPCB_PrimitivePour>>"
		],
		"rebuildCopperRegions": [
			"rebuildCopperRegions(primitiveIds?: Array<string>): Promise<Array<IPCB_PrimitivePoured>>"
		]
	},
	"pcb_PrimitivePoured": {
		"create": [
			"create(): undefined"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitivePoured | Array<string> | Array<IPCB_PrimitivePoured>): Promise<boolean>"
		],
		"modify": [
			"modify(): undefined"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitivePoured | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitivePoured>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(): Promise<Array<IPCB_PrimitivePoured>>"
		]
	},
	"pcb_PrimitiveRegion": {
		"create": [
			"create(layer: TPCB_LayersOfRegion, complexPolygon: IPCB_Polygon, ruleType?: Array<EPCB_PrimitiveRegionRuleType>, regionName?: string, lineWidth?: number, primitiveLock?: boolean): Promise<IPCB_PrimitiveRegion | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitiveRegion | Array<string> | Array<IPCB_PrimitiveRegion>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitiveRegion, property: { layer?: undefined | EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM | EPCB_LayerId.MULTI | EPCB_LayerId.INNER_1 | EPCB_LayerId.INNER_2 | EPCB_LayerId.INNER_3 | EPCB_LayerId.INNER_4 | EPCB_LayerId.INNER_5 | EPCB_LayerId.INNER_6 | EPCB_LayerId.INNER_7 | EPCB_LayerId.INNER_8 | EPCB_LayerId.INNER_9 | EPCB_LayerId.INNER_10 | EPCB_LayerId.INNER_11 | EPCB_LayerId.INNER_12 | EPCB_LayerId.INNER_13 | EPCB_LayerId.INNER_14 | EPCB_LayerId.INNER_15 | EPCB_LayerId.INNER_16 | EPCB_LayerId.INNER_17 | EPCB_LayerId.INNER_18 | EPCB_LayerId.INNER_19 | EPCB_LayerId.INNER_20 | EPCB_LayerId.INNER_21 | EPCB_LayerId.INNER_22 | EPCB_LayerId.INNER_23 | EPCB_LayerId.INNER_24 | EPCB_LayerId.INNER_25 | EPCB_LayerId.INNER_26 | EPCB_LayerId.INNER_27 | EPCB_LayerId.INNER_28 | EPCB_LayerId.INNER_29 | EPCB_LayerId.INNER_30; complexPolygon?: undefined | IPCB_Polygon; ruleType?: undefined | EPCB_PrimitiveRegionRuleType[]; regionName?: undefined | string; lineWidth?: undefined | number; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitiveRegion | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitiveRegion | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveRegion>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(layer?: TPCB_LayersOfRegion, ruleType?: Array<EPCB_PrimitiveRegionRuleType>, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(layer?: TPCB_LayersOfRegion, ruleType?: Array<EPCB_PrimitiveRegionRuleType>, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveRegion>>"
		]
	},
	"pcb_PrimitiveString": {
		"create": [
			"create(layer: TPCB_LayersOfImage, x: number, y: number, text: string, fontFamily: string, fontSize: number, lineWidth: number, alignMode: EPCB_PrimitiveStringAlignMode, rotation: number, reverse: boolean, expansion: number, mirror: boolean, primitiveLock: boolean): Promise<IPCB_PrimitiveString | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitiveString | Array<string> | Array<IPCB_PrimitiveString>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitiveString, property: { layer?: undefined | EPCB_LayerId.TOP | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.INNER_1 | EPCB_LayerId.INNER_2 | EPCB_LayerId.INNER_3 | EPCB_LayerId.INNER_4 | EPCB_LayerId.INNER_5 | EPCB_LayerId.INNER_6 | EPCB_LayerId.INNER_7 | EPCB_LayerId.INNER_8 | EPCB_LayerId.INNER_9 | EPCB_LayerId.INNER_10 | EPCB_LayerId.INNER_11 | EPCB_LayerId.INNER_12 | EPCB_LayerId.INNER_13 | EPCB_LayerId.INNER_14 | EPCB_LayerId.INNER_15 | EPCB_LayerId.INNER_16 | EPCB_LayerId.INNER_17 | EPCB_LayerId.INNER_18 | EPCB_LayerId.INNER_19 | EPCB_LayerId.INNER_20 | EPCB_LayerId.INNER_21 | EPCB_LayerId.INNER_22 | EPCB_LayerId.INNER_23 | EPCB_LayerId.INNER_24 | EPCB_LayerId.INNER_25 | EPCB_LayerId.INNER_26 | EPCB_LayerId.INNER_27 | EPCB_LayerId.INNER_28 | EPCB_LayerId.INNER_29 | EPCB_LayerId.INNER_30 | EPCB_LayerId.CUSTOM_1 | EPCB_LayerId.CUSTOM_2 | EPCB_LayerId.CUSTOM_3 | EPCB_LayerId.CUSTOM_4 | EPCB_LayerId.CUSTOM_5 | EPCB_LayerId.CUSTOM_6 | EPCB_LayerId.CUSTOM_7 | EPCB_LayerId.CUSTOM_8 | EPCB_LayerId.CUSTOM_9 | EPCB_LayerId.CUSTOM_10 | EPCB_LayerId.CUSTOM_11 | EPCB_LayerId.CUSTOM_12 | EPCB_LayerId.CUSTOM_13 | EPCB_LayerId.CUSTOM_14 | EPCB_LayerId.CUSTOM_15 | EPCB_LayerId.CUSTOM_16 | EPCB_LayerId.CUSTOM_17 | EPCB_LayerId.CUSTOM_18 | EPCB_LayerId.CUSTOM_19 | EPCB_LayerId.CUSTOM_20 | EPCB_LayerId.CUSTOM_21 | EPCB_LayerId.CUSTOM_22 | EPCB_LayerId.CUSTOM_23 | EPCB_LayerId.CUSTOM_24 | EPCB_LayerId.CUSTOM_25 | EPCB_LayerId.CUSTOM_26 | EPCB_LayerId.CUSTOM_27 | EPCB_LayerId.CUSTOM_28 | EPCB_LayerId.CUSTOM_29 | EPCB_LayerId.CUSTOM_30 | EPCB_LayerId.DRILL_DRAWING; x?: undefined | number; y?: undefined | number; text?: undefined | string; fontFamily?: undefined | string; fontSize?: undefined | number; lineWidth?: undefined | number; alignMode?: undefined | EPCB_PrimitiveStringAlignMode.LEFT_TOP | EPCB_PrimitiveStringAlignMode.LEFT_MIDDLE | EPCB_PrimitiveStringAlignMode.LEFT_BOTTOM | EPCB_PrimitiveStringAlignMode.CENTER_TOP | EPCB_PrimitiveStringAlignMode.CENTER | EPCB_PrimitiveStringAlignMode.CENTER_BOTTOM | EPCB_PrimitiveStringAlignMode.RIGHT_TOP | EPCB_PrimitiveStringAlignMode.RIGHT_MIDDLE | EPCB_PrimitiveStringAlignMode.RIGHT_BOTTOM; rotation?: undefined | number; reverse?: undefined | false | true; expansion?: undefined | number; mirror?: undefined | false | true; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitiveString | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitiveString | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveString>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(layer?: TPCB_LayersOfImage, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveString>>"
		]
	},
	"pcb_PrimitiveVia": {
		"create": [
			"create(net: string, x: number, y: number, holeDiameter: number, diameter: number, viaType?: EPCB_PrimitiveViaType, designRuleBlindViaName?: string | null, solderMaskExpansion?: IPCB_PrimitiveSolderMaskAndPasteMaskExpansion | null, primitiveLock?: boolean): Promise<IPCB_PrimitiveVia | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | IPCB_PrimitiveVia | Array<string> | Array<IPCB_PrimitiveVia>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | IPCB_PrimitiveVia, property: { net?: undefined | string; x?: undefined | number; y?: undefined | number; holeDiameter?: undefined | number; diameter?: undefined | number; viaType?: undefined | EPCB_PrimitiveViaType.VIA | EPCB_PrimitiveViaType.BLIND | EPCB_PrimitiveViaType.SUTURE; designRuleBlindViaName?: undefined | null | string; solderMaskExpansion?: undefined | null | IPCB_PrimitiveSolderMaskAndPasteMaskExpansion; primitiveLock?: undefined | false | true }): Promise<IPCB_PrimitiveVia | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<IPCB_PrimitiveVia | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<IPCB_PrimitiveVia>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(net?: string, primitiveLock?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(net?: string, primitiveLock?: boolean): Promise<Array<IPCB_PrimitiveVia>>"
		]
	},
	"pcb_RayTracerEngine": {
		"init": [
			"init(): Promise<void>"
		],
		"dispose": [
			"dispose(): Promise<void>"
		],
		"setRenderConfigurations": [
			"setRenderConfigurations(configurations: any): Promise<void>"
		],
		"getRenderConfigurations": [
			"getRenderConfigurations(): Promise<any>"
		],
		"getLightConfigurations": [
			"getLightConfigurations(lightName: string): Promise<any>"
		]
	},
	"pcb_SelectControl": {
		"getAllSelectedPrimitives_PrimitiveId": [
			"getAllSelectedPrimitives_PrimitiveId(): Promise<Array<string>>"
		],
		"getAllSelectedPrimitives": [
			"getAllSelectedPrimitives(): Promise<Array<IPCB_Primitive>>"
		],
		"getSelectedPrimitives": [
			"getSelectedPrimitives(): Promise<Array<object>>"
		],
		"doSelectPrimitives": [
			"doSelectPrimitives(primitiveIds: string | Array<string>): Promise<boolean>"
		],
		"doCrossProbeSelect": [
			"doCrossProbeSelect(components?: Array<string>, pins?: Array<string>, nets?: Array<string>, highlight?: boolean, select?: boolean): Promise<boolean>"
		],
		"doCrossProbeSelectByObject": [
			"doCrossProbeSelectByObject(components?: Array<string>, pins?: Array<string>, nets?: Array<string>): Promise<boolean>"
		],
		"clearSelected": [
			"clearSelected(): Promise<boolean>"
		],
		"getCurrentMousePosition": [
			"getCurrentMousePosition(): Promise<{ x: number; y: number } | undefined>"
		]
	},
	"pnl_Document": {
		"save": [
			"save(): Promise<boolean>"
		]
	},
	"sch_Document": {
		"importChanges": [
			"importChanges(): Promise<boolean>"
		],
		"save": [
			"save(): Promise<boolean>"
		],
		"navigateToCoordinates": [
			"navigateToCoordinates(x: number, y: number): Promise<boolean>"
		],
		"navigateToRegion": [
			"navigateToRegion(left: number, right: number, top: number, bottom: number): Promise<boolean>"
		],
		"getPrimitiveAtPoint": [
			"getPrimitiveAtPoint(x: number, y: number): Promise<ISCH_Primitive | undefined>"
		],
		"getPrimitivesInRegion": [
			"getPrimitivesInRegion(left: number, right: number, top: number, bottom: number): Promise<Array<ISCH_Primitive>>"
		],
		"getCurrentFilterConfiguration": [
			"getCurrentFilterConfiguration(): Promise<Record<string, boolean> | undefined>"
		],
		"autoRouting": [
			"autoRouting(props?: { uuids?: undefined | string[]; netlist?: undefined | { component: Record<string, { pinInfoMap: Record<string, { name: string; number: string; net: string; props: { 'Pin Number': string } }> }> }; designatorDeviceTypeMap?: undefined | Record<string, 'resistor' | 'capacitor' | 'inductive' | 'diode' | 'triode' | 'oscillator' | 'chip' | 'otherDevice'> }): Promise<any>"
		],
		"autoLayout": [
			"autoLayout(props?: { uuids?: undefined | string[]; netlist?: undefined | { component: Record<string, { pinInfoMap: Record<string, { name: string; number: string; net: string; props: { 'Pin Number': string } }> }> }; designatorDeviceTypeMap?: undefined | Record<string, 'resistor' | 'capacitor' | 'inductive' | 'diode' | 'triode' | 'oscillator' | 'chip' | 'otherDevice'> }): Promise<any>"
		]
	},
	"sch_Drc": {
		"check": [
			"check(strict: boolean, userInterface: boolean, includeVerboseError: false): Promise<boolean>",
			"check(strict: boolean, userInterface: boolean, includeVerboseError: true): Promise<Array<ISCH_DrcError>>"
		]
	},
	"sch_Event": {
		"addMouseEventListener": [
			"addMouseEventListener(id: string, eventType: 'all' | ESCH_MouseEventType, callFn: (eventType: ESCH_MouseEventType) => void | Promise<void>, onlyOnce?: boolean): void"
		],
		"addPrimitiveEventListener": [
			"addPrimitiveEventListener(id: string, eventType: 'all' | ESCH_PrimitiveEventType, callFn: (eventType: ESCH_PrimitiveEventType, props: { primitiveIds: string[] }) => void | Promise<void>, onlyOnce?: boolean): void"
		],
		"addSimulationEnginePullEventListener": [
			"addSimulationEnginePullEventListener(id: string, eventType: 'all', callFn: (eventType: ESCH_DynamicSimulationEnginePullEventType | ESCH_SpiceSimulationEnginePullEventType, props: Record<string, any>) => void | Promise<void>): void"
		],
		"removeEventListener": [
			"removeEventListener(id: string): boolean"
		],
		"isEventListenerAlreadyExist": [
			"isEventListenerAlreadyExist(id: string): boolean"
		]
	},
	"sch_ManufactureData": {
		"getAssemblyVariantsConfigs": [
			"getAssemblyVariantsConfigs(): Promise<Array<{ text: string; value: string }>>"
		],
		"getBomTemplates": [
			"getBomTemplates(): Promise<Array<string>>"
		],
		"uploadBomTemplateFile": [
			"uploadBomTemplateFile(templateFile: File, template?: string): Promise<string | undefined>"
		],
		"getBomTemplateFile": [
			"getBomTemplateFile(template: string): Promise<File | undefined>"
		],
		"deleteBomTemplate": [
			"deleteBomTemplate(template: string): Promise<boolean>"
		],
		"getBomFile": [
			"getBomFile(fileName?: string, fileType?: 'xlsx' | 'csv', template?: string, filterOptions?: Array<{ property: string; includeValue: string | false | true }>, statistics?: Array<string>, property?: Array<string>, columns?: Array<IPCB_BomPropertiesTableColumns>, assemblyVariantsConfig?: { text: string; value: string }): Promise<File | undefined>"
		],
		"getNetlistFile": [
			"getNetlistFile(fileName?: string, netlistType?: ESYS_NetlistType): Promise<File | undefined>"
		],
		"getSimulationNetlistFile": [
			"getSimulationNetlistFile(fileName?: string, netlistType?: ESCH_SimulationNetlistType): Promise<File | undefined>"
		],
		"getExportDocumentFile": [
			"getExportDocumentFile(fileName?: string, fileType?: ESCH_ExportDocumentFileType, typeSpecificParams?: { theme?: undefined | 'Default' | 'White on Black' | 'Black on White'; lineWidth?: undefined | 'Default' | 'Always 1px' | 'Follow the Zoom Change'; displayAttributesAsMenu?: undefined | false | true; size?: undefined | string | { width: number; height: number; unit: ESYS_Unit.MILLIMETER | ESYS_Unit.INCH } }, object?: 'All Schematic' | 'Current Schematic' | 'Current Schematic Page' | string, objectSpecificParams?: { range?: undefined | 'All' | any; outputMethod?: undefined | 'Merged sheet' | 'Separated sheet' }): Promise<File | undefined>"
		],
		"placeComponentsOrder": [
			"placeComponentsOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>"
		],
		"placeSmtComponentsOrder": [
			"placeSmtComponentsOrder(interactive?: boolean, ignoreWarning?: boolean): Promise<boolean>"
		]
	},
	"sch_Net": {
		"getCurrentProjectAllNets": [
			"getCurrentProjectAllNets(): Promise<Array<ISCH_ProjectNetInfo>>"
		],
		"getAllNets": [
			"getAllNets(): Promise<Array<ISCH_NetInfo>>"
		],
		"getNet": [
			"getNet(net: string): Promise<ISCH_NetInfo | undefined>"
		],
		"getAllNetsName": [
			"getAllNetsName(): Promise<Array<string>>"
		],
		"buildProjectNetInfo": [
			"buildProjectNetInfo(schId: string, schematic: IRawSchematic, pure: IRawPureSchematic, boardName: string): ISCH_ProjectNetInfo"
		],
		"buildSortedNets": [
			"buildSortedNets(nlNetWires: Array<IRawNet>, sheetMap: Map<string, IRawPureSchematic['sheets'][string]>): Array<ISCH_NetInfo>"
		],
		"buildSortedWires": [
			"buildSortedWires(wires: Array<IRawWire>, sheetMap: Map<string, IRawPureSchematic['sheets'][string]>): Array<ISCH_WireInfo>"
		]
	},
	"sch_Netlist": {
		"getNetlist": [
			"getNetlist(type?: ESYS_NetlistType): Promise<string>"
		],
		"setNetlist": [
			"setNetlist(type: ESYS_NetlistType | undefined, netlist: string): Promise<void>"
		]
	},
	"sch_Primitive": {
		"getPrimitiveTypeByPrimitiveId": [
			"getPrimitiveTypeByPrimitiveId(id: string): Promise<ESCH_PrimitiveType | undefined>"
		],
		"getPrimitiveByPrimitiveId": [
			"getPrimitiveByPrimitiveId(id: string): Promise<ISCH_Primitive | undefined>"
		],
		"getPrimitivesByPrimitiveId": [
			"getPrimitivesByPrimitiveId(ids: Array<string>): Promise<Array<ISCH_Primitive>>"
		],
		"getPrimitivesBBox": [
			"getPrimitivesBBox(primitiveIds: Array<string | ISCH_Primitive>): Promise<{ minX: number; minY: number; maxX: number; maxY: number } | undefined>"
		]
	},
	"sch_PrimitiveArc": {
		"create": [
			"create(startX: number, startY: number, referenceX: number, referenceY: number, endX: number, endY: number, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null): Promise<ISCH_PrimitiveArc | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | ISCH_PrimitiveArc | Array<string> | Array<ISCH_PrimitiveArc>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | ISCH_PrimitiveArc, property: { startX?: undefined | number; startY?: undefined | number; referenceX?: undefined | number; referenceY?: undefined | number; endX?: undefined | number; endY?: undefined | number; color?: undefined | null | string; fillColor?: undefined | null | string; lineWidth?: undefined | null | number; lineType?: undefined | null | ESCH_PrimitiveLineType.SOLID | ESCH_PrimitiveLineType.DASHED | ESCH_PrimitiveLineType.DOTTED | ESCH_PrimitiveLineType.DOT_DASHED }): Promise<ISCH_PrimitiveArc | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<ISCH_PrimitiveArc | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveArc>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(): Promise<Array<ISCH_PrimitiveArc>>"
		]
	},
	"sch_PrimitiveAttribute": {
		"create": [
			"create(): undefined"
		],
		"delete": [
			"delete(): boolean"
		],
		"modify": [
			"modify(primitiveId: string | ISCH_PrimitiveAttribute, property: { x?: undefined | null | number; y?: undefined | null | number; rotation?: undefined | null | number; color?: undefined | null | string; fontName?: undefined | null | string; fontSize?: undefined | null | number; bold?: undefined | null | false | true; italic?: undefined | null | false | true; underLine?: undefined | null | false | true; alignMode?: undefined | null | ESCH_PrimitiveTextAlignMode.LEFT_TOP | ESCH_PrimitiveTextAlignMode.LEFT_MIDDLE | ESCH_PrimitiveTextAlignMode.LEFT_BOTTOM | ESCH_PrimitiveTextAlignMode.CENTER_TOP | ESCH_PrimitiveTextAlignMode.CENTER | ESCH_PrimitiveTextAlignMode.CENTER_BOTTOM | ESCH_PrimitiveTextAlignMode.RIGHT_TOP | ESCH_PrimitiveTextAlignMode.RIGHT_MIDDLE | ESCH_PrimitiveTextAlignMode.RIGHT_BOTTOM; fillColor?: undefined | null | string; key?: undefined | string; value?: undefined | string; keyVisible?: undefined | null | false | true; valueVisible?: undefined | null | false | true }): Promise<ISCH_PrimitiveAttribute | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<ISCH_PrimitiveAttribute | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveAttribute>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(parentPrimitiveId?: string): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(parentPrimitiveId?: string): Promise<Array<ISCH_PrimitiveAttribute>>"
		],
		"createNetLabel": [
			"createNetLabel(x: number, y: number, net: string): Promise<ISCH_PrimitiveAttribute | undefined>"
		]
	},
	"sch_PrimitiveBus": {
		"create": [
			"create(busName: string, line: Array<number> | Array<Array<number>>, color?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null): Promise<ISCH_PrimitiveBus | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | ISCH_PrimitiveBus | Array<string> | Array<ISCH_PrimitiveBus>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | ISCH_PrimitiveBus, property: { busName?: undefined | string; line?: undefined | number[] | number[][]; color?: undefined | null | string; lineWidth?: undefined | null | number; lineType?: undefined | null | ESCH_PrimitiveLineType.SOLID | ESCH_PrimitiveLineType.DASHED | ESCH_PrimitiveLineType.DOTTED | ESCH_PrimitiveLineType.DOT_DASHED }): Promise<ISCH_PrimitiveBus | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<ISCH_PrimitiveBus | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveBus>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(): Promise<Array<ISCH_PrimitiveBus>>"
		]
	},
	"sch_PrimitiveCircle": {
		"create": [
			"create(centerX: number, centerY: number, radius: number, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null, fillStyle?: ESCH_PrimitiveFillStyle | null): Promise<ISCH_PrimitiveCircle | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | ISCH_PrimitiveCircle | Array<string> | Array<ISCH_PrimitiveCircle>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | ISCH_PrimitiveCircle, property: { centerX?: undefined | number; centerY?: undefined | number; radius?: undefined | number; color?: undefined | null | string; fillColor?: undefined | null | string; lineWidth?: undefined | null | number; lineType?: undefined | null | ESCH_PrimitiveLineType.SOLID | ESCH_PrimitiveLineType.DASHED | ESCH_PrimitiveLineType.DOTTED | ESCH_PrimitiveLineType.DOT_DASHED; fillStyle?: undefined | null | ESCH_PrimitiveFillStyle.NONE | ESCH_PrimitiveFillStyle.SOLID | ESCH_PrimitiveFillStyle.GRID | ESCH_PrimitiveFillStyle.HORIZONTAL_LINE | ESCH_PrimitiveFillStyle.VERTICAL_LINE | ESCH_PrimitiveFillStyle.RHOMBIC_GRID | ESCH_PrimitiveFillStyle.LEFT_SLASH_LINE | ESCH_PrimitiveFillStyle.RIGHT_SLASH_LINE }): Promise<ISCH_PrimitiveCircle | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<ISCH_PrimitiveCircle | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveCircle>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(): Promise<Array<ISCH_PrimitiveCircle>>"
		]
	},
	"sch_PrimitiveComponent": {
		"setNetFlagComponentUuid_Power": [
			"setNetFlagComponentUuid_Power(component: { libraryUuid: string; uuid: string } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>"
		],
		"setNetFlagComponentUuid_Ground": [
			"setNetFlagComponentUuid_Ground(component: { libraryUuid: string; uuid: string } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>"
		],
		"setNetFlagComponentUuid_AnalogGround": [
			"setNetFlagComponentUuid_AnalogGround(component: { libraryUuid: string; uuid: string } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>"
		],
		"setNetFlagComponentUuid_ProtectGround": [
			"setNetFlagComponentUuid_ProtectGround(component: { libraryUuid: string; uuid: string } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>"
		],
		"setNetPortComponentUuid_IN": [
			"setNetPortComponentUuid_IN(component: { libraryUuid: string; uuid: string } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>"
		],
		"setNetPortComponentUuid_OUT": [
			"setNetPortComponentUuid_OUT(component: { libraryUuid: string; uuid: string } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>"
		],
		"setNetPortComponentUuid_BI": [
			"setNetPortComponentUuid_BI(component: { libraryUuid: string; uuid: string } | ILIB_DeviceItem | ILIB_DeviceSearchItem): Promise<boolean>"
		],
		"create": [
			"create(component: { libraryType?: undefined | ELIB_LibraryType.DEVICE; libraryUuid: string; uuid: string } | ILIB_DeviceItem | ILIB_DeviceSearchItem | { libraryType: ELIB_LibraryType.SYMBOL; libraryUuid: string; uuid: string } | ILIB_SymbolItem | ILIB_SymbolSearchItem, x: number, y: number, subPartName?: string, rotation?: number, mirror?: boolean, addIntoBom?: boolean, addIntoPcb?: boolean): Promise<ISCH_PrimitiveComponent | undefined>"
		],
		"createNetFlag": [
			"createNetFlag(identification: 'Power' | 'Ground' | 'AnalogGround' | 'ProtectGround', net: string, x: number, y: number, rotation?: number, mirror?: boolean): Promise<ISCH_PrimitiveComponent | undefined>"
		],
		"createNetPort": [
			"createNetPort(direction: 'IN' | 'OUT' | 'BI', net: string, x: number, y: number, rotation?: number, mirror?: boolean): Promise<ISCH_PrimitiveComponent | undefined>"
		],
		"createShortCircuitFlag": [
			"createShortCircuitFlag(x: number, y: number, rotation?: number, mirror?: boolean): Promise<ISCH_PrimitiveComponent | undefined>"
		],
		"createCbbSymbol": [
			"createCbbSymbol(cbbSymbol: { libraryUuid: string; cbbUuid: string; uuid?: undefined | string }, x: number, y: number, rotation?: number, mirror?: boolean): Promise<ISCH_PrimitiveCbbSymbolComponent | undefined>"
		],
		"placeCbbSchematicPage": [
			"placeCbbSchematicPage(cbbSchematicPage: { libraryUuid: string; cbbUuid: string; uuid: string }, x: number, y: number, props?: { reimportWhenNameRepeated?: undefined | false | true }): Promise<boolean>"
		],
		"delete": [
			"delete(primitiveIds: string | ISCH_PrimitiveComponent | Array<string> | Array<ISCH_PrimitiveComponent>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | ISCH_PrimitiveComponent, property: { x?: undefined | number; y?: undefined | number; rotation?: undefined | number; mirror?: undefined | false | true; addIntoBom?: undefined | false | true; addIntoPcb?: undefined | false | true; designator?: undefined | null | string; name?: undefined | null | string; uniqueId?: undefined | null | string; manufacturer?: undefined | null | string; manufacturerId?: undefined | null | string; supplier?: undefined | null | string; supplierId?: undefined | null | string; otherProperty?: undefined | Record<string, string | number | false | true> }): Promise<ISCH_PrimitiveComponent | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<ISCH_PrimitiveComponent | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveComponent>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(componentType?: ESCH_PrimitiveComponentType, allSchematicPages?: boolean): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(componentType?: ESCH_PrimitiveComponentType, allSchematicPages?: boolean): Promise<Array<ISCH_PrimitiveComponent>>"
		],
		"getAllPinsByPrimitiveId": [
			"getAllPinsByPrimitiveId(primitiveId: string): Promise<Array<ISCH_PrimitiveComponentPin> | undefined>"
		],
		"placeComponentWithMouse": [
			"placeComponentWithMouse(component: { libraryUuid: string; uuid: string } | ILIB_DeviceItem | ILIB_DeviceSearchItem, subPartName?: string): Promise<boolean>"
		],
		"placeSymbolWithMouse": [
			"placeSymbolWithMouse(symbol: { libraryUuid: string; uuid: string } | ILIB_SymbolItem | ILIB_SymbolSearchItem, subPartName?: string, properties?: Record<string, boolean | number | string | undefined>): Promise<boolean>"
		],
		"getAllPropertyNames": [
			"getAllPropertyNames(): Promise<Array<string>>"
		],
		"getComponentDetail": [
			"getComponentDetail(componentUuid: string, libraryUuid: string): Promise<any>"
		],
		"checkComponentType": [
			"checkComponentType(componentType: ESCH_PrimitiveComponentType, componentUuid: string, libraryUuid: string): Promise<boolean>"
		],
		"initUuid": [
			"initUuid(): Promise<void>"
		]
	},
	"sch_PrimitivePin": {
		"create": [
			"create(x: number, y: number, pinNumber: string, pinName?: string, rotation?: number, pinLength?: number, pinColor?: string | null, pinShape?: ESCH_PrimitivePinShape, pinType?: ESCH_PrimitivePinType): Promise<ISCH_PrimitivePin | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | ISCH_PrimitivePin | Array<string> | Array<ISCH_PrimitivePin>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | ISCH_PrimitivePin | ISCH_PrimitiveComponentPin, property: { x?: undefined | number; y?: undefined | number; pinNumber?: undefined | string; pinName?: undefined | string; rotation?: undefined | number; pinLength?: undefined | number; pinColor?: undefined | null | string; pinShape?: undefined | ESCH_PrimitivePinShape.NONE | ESCH_PrimitivePinShape.INVERTED | ESCH_PrimitivePinShape.CLOCK | ESCH_PrimitivePinShape.INVERTED_CLOCK; pinType?: undefined | ESCH_PrimitivePinType.IN | ESCH_PrimitivePinType.OUT | ESCH_PrimitivePinType.BI | ESCH_PrimitivePinType.PASSIVE | ESCH_PrimitivePinType.OPEN_COLLECTOR | ESCH_PrimitivePinType.OPEN_EMITTER | ESCH_PrimitivePinType.POWER | ESCH_PrimitivePinType.GROUND | ESCH_PrimitivePinType.HIZ | ESCH_PrimitivePinType.TERMINATOR | ESCH_PrimitivePinType.UNDEFINED; noConnected?: undefined | false | true; otherProperty?: undefined | Record<string, string | number | false | true> }): Promise<ISCH_PrimitivePin | ISCH_PrimitiveComponentPin | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<ISCH_PrimitivePin | ISCH_PrimitiveComponentPin | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitivePin | ISCH_PrimitiveComponentPin>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(): Promise<Array<ISCH_PrimitivePin>>"
		]
	},
	"sch_PrimitivePolygon": {
		"create": [
			"create(line: Array<number>, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null): Promise<ISCH_PrimitivePolygon | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | ISCH_PrimitivePolygon | Array<string> | Array<ISCH_PrimitivePolygon>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | ISCH_PrimitivePolygon, property: { line?: undefined | number[]; color?: undefined | null | string; fillColor?: undefined | null | string; lineWidth?: undefined | null | number; lineType?: undefined | null | ESCH_PrimitiveLineType.SOLID | ESCH_PrimitiveLineType.DASHED | ESCH_PrimitiveLineType.DOTTED | ESCH_PrimitiveLineType.DOT_DASHED }): Promise<ISCH_PrimitivePolygon | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<ISCH_PrimitivePolygon | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitivePolygon>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(): Promise<Array<ISCH_PrimitivePolygon>>"
		]
	},
	"sch_PrimitiveRectangle": {
		"create": [
			"create(topLeftX: number, topLeftY: number, width: number, height: number, cornerRadius?: number, rotation?: number, color?: string | null, fillColor?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null, fillStyle?: ESCH_PrimitiveFillStyle | null): Promise<ISCH_PrimitiveRectangle | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | ISCH_PrimitiveRectangle | Array<string> | Array<ISCH_PrimitiveRectangle>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | ISCH_PrimitiveRectangle, property: { topLeftX?: undefined | number; topLeftY?: undefined | number; width?: undefined | number; height?: undefined | number; cornerRadius?: undefined | number; rotation?: undefined | number; color?: undefined | null | string; fillColor?: undefined | null | string; lineWidth?: undefined | null | number; lineType?: undefined | null | ESCH_PrimitiveLineType.SOLID | ESCH_PrimitiveLineType.DASHED | ESCH_PrimitiveLineType.DOTTED | ESCH_PrimitiveLineType.DOT_DASHED; fillStyle?: undefined | null | ESCH_PrimitiveFillStyle.NONE | ESCH_PrimitiveFillStyle.SOLID | ESCH_PrimitiveFillStyle.GRID | ESCH_PrimitiveFillStyle.HORIZONTAL_LINE | ESCH_PrimitiveFillStyle.VERTICAL_LINE | ESCH_PrimitiveFillStyle.RHOMBIC_GRID | ESCH_PrimitiveFillStyle.LEFT_SLASH_LINE | ESCH_PrimitiveFillStyle.RIGHT_SLASH_LINE }): Promise<ISCH_PrimitiveRectangle | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<ISCH_PrimitiveRectangle | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveRectangle>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(): Promise<Array<ISCH_PrimitiveRectangle>>"
		]
	},
	"sch_PrimitiveText": {
		"create": [
			"create(x: number, y: number, content: string, rotation?: number, textColor?: string | null, fontName?: string | null, fontSize?: number | null, bold?: boolean, italic?: boolean, underLine?: boolean, alignMode?: ESCH_PrimitiveTextAlignMode): Promise<ISCH_PrimitiveText | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | ISCH_PrimitiveText | Array<string> | Array<ISCH_PrimitiveText>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | ISCH_PrimitiveText, property: { x?: undefined | number; y?: undefined | number; content?: undefined | string; rotation?: undefined | number; textColor?: undefined | null | string; fontName?: undefined | null | string; fontSize?: undefined | null | number; bold?: undefined | false | true; italic?: undefined | false | true; underLine?: undefined | false | true; alignMode?: undefined | ESCH_PrimitiveTextAlignMode.LEFT_TOP | ESCH_PrimitiveTextAlignMode.LEFT_MIDDLE | ESCH_PrimitiveTextAlignMode.LEFT_BOTTOM | ESCH_PrimitiveTextAlignMode.CENTER_TOP | ESCH_PrimitiveTextAlignMode.CENTER | ESCH_PrimitiveTextAlignMode.CENTER_BOTTOM | ESCH_PrimitiveTextAlignMode.RIGHT_TOP | ESCH_PrimitiveTextAlignMode.RIGHT_MIDDLE | ESCH_PrimitiveTextAlignMode.RIGHT_BOTTOM }): Promise<ISCH_PrimitiveText | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<ISCH_PrimitiveText | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveText>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(): Promise<Array<ISCH_PrimitiveText>>"
		]
	},
	"sch_PrimitiveWire": {
		"create": [
			"create(line: Array<number> | Array<Array<number>>, net?: string, color?: string | null, lineWidth?: number | null, lineType?: ESCH_PrimitiveLineType | null): Promise<ISCH_PrimitiveWire | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | ISCH_PrimitiveWire | Array<string> | Array<ISCH_PrimitiveWire>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | ISCH_PrimitiveWire, property: { line?: undefined | number[] | number[][]; net?: undefined | string; color?: undefined | null | string; lineWidth?: undefined | null | number; lineType?: undefined | null | ESCH_PrimitiveLineType.SOLID | ESCH_PrimitiveLineType.DASHED | ESCH_PrimitiveLineType.DOTTED | ESCH_PrimitiveLineType.DOT_DASHED }): Promise<ISCH_PrimitiveWire | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<ISCH_PrimitiveWire | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveWire>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(net?: string | Array<string>): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(net?: string | Array<string>): Promise<Array<ISCH_PrimitiveWire>>"
		]
	},
	"sch_SelectControl": {
		"getAllSelectedPrimitives_PrimitiveId": [
			"getAllSelectedPrimitives_PrimitiveId(): Promise<Array<string>>"
		],
		"getAllSelectedPrimitives": [
			"getAllSelectedPrimitives(): Promise<Array<ISCH_Primitive>>"
		],
		"getSelectedPrimitives_PrimitiveId": [
			"getSelectedPrimitives_PrimitiveId(): Promise<Array<string>>"
		],
		"getSelectedPrimitives": [
			"getSelectedPrimitives(): Promise<Array<object>>"
		],
		"doSelectPrimitives": [
			"doSelectPrimitives(primitiveIds: string | Array<string>): Promise<boolean>"
		],
		"doCrossProbeSelect": [
			"doCrossProbeSelect(components?: Array<string>, pins?: Array<string>, nets?: Array<string>, highlight?: boolean, select?: boolean): boolean"
		],
		"clearSelected": [
			"clearSelected(): boolean"
		],
		"getCurrentMousePosition": [
			"getCurrentMousePosition(): Promise<{ x: number; y: number } | undefined>"
		]
	},
	"sch_SimulationEngine": {
		"pushData": [
			"pushData(eventType: ESCH_DynamicSimulationEnginePushEventType | ESCH_SpiceSimulationEnginePushEventType, props: Record<string, any>): void"
		]
	},
	"sch_Utils": {
		"splitLines": [
			"splitLines(lines: Array<number | Array<number>>): Array<Array<number | Array<number>>> | undefined"
		]
	},
	"sch_PrimitiveObject": {
		"create": [
			"create(content: File | string, startX: number, startY: number, width?: number, height?: number, rotation?: number, mirror?: boolean, fileName?: string): Promise<ISCH_PrimitiveObject | undefined>"
		],
		"delete": [
			"delete(primitiveIds: string | ISCH_PrimitiveObject | Array<string> | Array<ISCH_PrimitiveObject>): Promise<boolean>"
		],
		"modify": [
			"modify(primitiveId: string | ISCH_PrimitiveObject, property: { content?: undefined | string | File; startX?: undefined | number; startY?: undefined | number; width?: undefined | number; height?: undefined | number; rotation?: undefined | number; mirror?: undefined | false | true; fileName?: undefined | string }): Promise<ISCH_PrimitiveObject | undefined>"
		],
		"get": [
			"get(primitiveIds: string): Promise<ISCH_PrimitiveObject | undefined>",
			"get(primitiveIds: Array<string>): Promise<Array<ISCH_PrimitiveObject>>"
		],
		"getAllPrimitiveId": [
			"getAllPrimitiveId(): Promise<Array<string>>"
		],
		"getAll": [
			"getAll(): Promise<Array<ISCH_PrimitiveObject>>"
		]
	},
	"sys_ClientUrl": {
		"request": [
			"request(url: string, method?: 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE' | 'PATCH', data?: string | Blob | FormData | URLSearchParams, options?: { headers?: undefined | { [key: string]: any }; integrity?: undefined | string }, succeedCallFn?: (data: Response) => void | Promise<void>): Promise<Response>"
		]
	},
	"sys_Dialog": {
		"createDesignPortal": [
			"createDesignPortal(): IDesignPortal"
		],
		"showInformationMessage": [
			"showInformationMessage(content: string, title?: string, buttonTitle?: string): void"
		],
		"showConfirmationMessage": [
			"showConfirmationMessage(content: string, title?: string, mainButtonTitle?: string, buttonTitle?: string, callbackFn?: (mainButtonClicked: boolean) => void): void"
		],
		"showInputDialog": [
			"showInputDialog(beforeContent?: string, afterContent?: string, title?: string, type?: 'color' | 'date' | 'datetime-local' | 'email' | 'mouth' | 'number' | 'password' | 'tel' | 'text' | 'time' | 'url' | 'week', value?: string | number, otherProperty?: { max?: undefined | number; maxlength?: undefined | number; min?: undefined | number; minlength?: undefined | number; multiple?: undefined | false | true; pattern?: undefined | RegExp; placeholder?: undefined | string; readonly?: undefined | false | true; step?: undefined | number }, callbackFn?: (value: any) => void): void"
		],
		"showSelectDialog": [
			"showSelectDialog(options: Array<string> | Array<{ value: string; displayContent: string }>, beforeContent?: string, afterContent?: string, title?: string, defaultOption?: string, multiple?: false, callbackFn?: (value: string) => void | Promise<void>): void",
			"showSelectDialog(options: Array<string> | Array<{ value: string; displayContent: string }>, beforeContent?: string, afterContent?: string, title?: string, defaultOption?: Array<string>, multiple?: true, callbackFn?: (value: Array<string>) => void | Promise<void>): void"
		],
		"insertScriptToDialog": [
			"insertScriptToDialog(dialogId: string, scriptFunction: (...args: Array<any>) => void | Promise<void>, ...args: Array<any>): void"
		]
	},
	"sys_Environment": {
		"isWeb": [
			"isWeb(): boolean"
		],
		"isClient": [
			"isClient(): boolean"
		],
		"isEasyEDAProEdition": [
			"isEasyEDAProEdition(): boolean"
		],
		"isJLCEDAProEdition": [
			"isJLCEDAProEdition(): boolean"
		],
		"isProPrivateEdition": [
			"isProPrivateEdition(): boolean"
		],
		"isOnlineMode": [
			"isOnlineMode(): boolean"
		],
		"isHalfOfflineMode": [
			"isHalfOfflineMode(): boolean"
		],
		"isOfflineMode": [
			"isOfflineMode(): boolean"
		],
		"getEditorCurrentVersion": [
			"getEditorCurrentVersion(onlySemantic?: boolean): string"
		],
		"getEditorCompliedDate": [
			"getEditorCompliedDate(): string"
		],
		"getUserInfo": [
			"getUserInfo(): { username?: undefined | string; nickname?: undefined | string; avatar?: undefined | string; uuid?: undefined | string; customerCode?: undefined | string }"
		],
		"setKeepProjectHasOnlyOneBoard": [
			"setKeepProjectHasOnlyOneBoard(status?: boolean): Promise<void>"
		]
	},
	"sys_FileManager": {
		"getProjectFile": [
			"getProjectFile(fileName?: string, password?: string, fileType?: 'epro' | 'epro2'): Promise<File | undefined>"
		],
		"getDocumentFile": [
			"getDocumentFile(fileName?: string, password?: string, fileType?: 'epro' | 'epro2'): Promise<File | undefined>"
		],
		"getDocumentSource": [
			"getDocumentSource(): Promise<string | undefined>"
		],
		"getDocumentFootprintSources": [
			"getDocumentFootprintSources(): Promise<Array<{ footprintUuid: string; documentSource: string }>>"
		],
		"setDocumentSource": [
			"setDocumentSource(source: string): Promise<boolean>"
		],
		"getProjectFileByProjectUuid": [
			"getProjectFileByProjectUuid(projectUuid: string, fileName?: string, password?: string, fileType?: 'epro' | 'epro2'): Promise<File | undefined>"
		],
		"getDeviceFileByDeviceUuid": [
			"getDeviceFileByDeviceUuid(deviceUuid: string | Array<string>, libraryUuid?: string, fileType?: 'elibz' | 'elibz2'): Promise<File | undefined>"
		],
		"getSymbolFileBySymbolUuid": [
			"getSymbolFileBySymbolUuid(symbolUuid: string | Array<string>, libraryUuid?: string, fileType?: 'elibz' | 'elibz2'): Promise<File | undefined>"
		],
		"getFootprintFileByFootprintUuid": [
			"getFootprintFileByFootprintUuid(footprintUuid: string | Array<string>, libraryUuid?: string, fileType?: 'elibz' | 'elibz2'): Promise<File | undefined>"
		],
		"getCbbFileByCbbUuid": [
			"getCbbFileByCbbUuid(cbbUuid: string, libraryUuid?: string, props?: { fileName?: undefined | string; password?: undefined | string; fileType?: undefined | 'epro' | 'epro2'; templateSchematicUuid?: undefined | string; templatePcbUuid?: undefined | string }): Promise<File | undefined>"
		],
		"getPanelLibraryFileByPanelLibraryUuid": [
			"getPanelLibraryFileByPanelLibraryUuid(panelLibraryUuid: string | Array<string>, libraryUuid?: string, fileType?: 'elibz' | 'elibz2'): Promise<File | undefined>"
		],
		"importProjectByProjectFile": [
			"importProjectByProjectFile(projectFile: File, fileType?: 'JLCEDA' | 'JLCEDA Pro' | 'EasyEDA' | 'EasyEDA Pro' | 'Allegro' | 'OrCAD' | 'EAGLE' | 'KiCad' | 'PADS' | 'LTspice', props?: { importOption?: undefined | ESYS_ImportProjectImportOption.IMPORT_DOCUMENT | ESYS_ImportProjectImportOption.EXTRACT_LIBRARIES | ESYS_ImportProjectImportOption.IMPORT_DOCUMENT_EXTRACT_LIBRARIES; schematicObjectStyle?: undefined | ESYS_ImportProjectSchematicObjectStyle.USE_SYSTEM_THEME | ESYS_ImportProjectSchematicObjectStyle.USE_SOURCE_FILE_STYLE; associateFootprint?: undefined | false | true; associate3DModel?: undefined | false | true; importFootprintNotesLayer?: undefined | false | true }, saveTo?: { operation: 'New Project'; newProjectOwnerTeamUuid: string; newProjectOwnerFolderUuid?: undefined | string; newProjectName?: undefined | string; newProjectFriendlyName?: undefined | string; newProjectDescription?: undefined | string; newProjectCollaborationMode?: undefined | EDMT_ProjectCollaborationMode.STRICT | EDMT_ProjectCollaborationMode.FREE } | { operation: 'Existing Project'; existingProjectUuid: string }, librariesImportSetting?: { ownerTeamUuid: string; deviceClassification?: undefined | string[]; symbolClassification?: undefined | string[]; footprintClassification?: undefined | string[]; createDeviceForSingleSymbol?: undefined | false | true; updateExistingLibrariesWithTheSameName?: undefined | false | true }): Promise<IDMT_BriefProjectItem | undefined>",
			"importProjectByProjectFile(projectFile: File, fileType?: 'Altium Designer' | 'Protel', props?: { importOption?: undefined | ESYS_ImportProjectImportOption.IMPORT_DOCUMENT | ESYS_ImportProjectImportOption.EXTRACT_LIBRARIES | ESYS_ImportProjectImportOption.IMPORT_DOCUMENT_EXTRACT_LIBRARIES; viaSolderMaskExpansion?: undefined | ESYS_ImportProjectViaSolderMaskExpansion.ALL_COVER_OIL | ESYS_ImportProjectViaSolderMaskExpansion.FOLLOW_ORIGINAL_SETTING; boardOutlineSource?: undefined | ESYS_ImportProjectBoardOutlineSource.FROM_KEEPOUT_LAYER | ESYS_ImportProjectBoardOutlineSource.FROM_MECHANICAL_LAYER_1; schematicObjectStyle?: undefined | ESYS_ImportProjectSchematicObjectStyle.USE_SYSTEM_THEME | ESYS_ImportProjectSchematicObjectStyle.USE_SOURCE_FILE_STYLE; associateFootprint?: undefined | false | true; associate3DModel?: undefined | false | true; importFootprintNotesLayer?: undefined | false | true }, saveTo?: { operation: 'New Project'; newProjectOwnerTeamUuid: string; newProjectOwnerFolderUuid?: undefined | string; newProjectName?: undefined | string; newProjectFriendlyName?: undefined | string; newProjectDescription?: undefined | string; newProjectCollaborationMode?: undefined | EDMT_ProjectCollaborationMode.STRICT | EDMT_ProjectCollaborationMode.FREE } | { operation: 'Existing Project'; existingProjectUuid: string }, librariesImportSetting?: { ownerTeamUuid: string; deviceClassification?: undefined | string[]; symbolClassification?: undefined | string[]; footprintClassification?: undefined | string[]; createDeviceForSingleSymbol?: undefined | false | true; updateExistingLibrariesWithTheSameName?: undefined | false | true }): Promise<IDMT_BriefProjectItem | undefined>"
		],
		"extractProjectInfo": [
			"extractProjectInfo(data: File): Promise<any>"
		],
		"extractLibInfo": [
			"extractLibInfo(data: File | Array<File>): Promise<any>"
		]
	},
	"sys_FileSystem": {
		"getExtensionFile": [
			"getExtensionFile(uri: string): Promise<File | undefined>"
		],
		"openReadFileDialog": [
			"openReadFileDialog(filenameExtensions?: string | Array<string>, multiFiles?: true): Promise<Array<File> | undefined>",
			"openReadFileDialog(filenameExtensions?: string | Array<string>, multiFiles?: false): Promise<File | undefined>"
		],
		"openReadFolderDialog": [
			"openReadFolderDialog(): Promise<Array<{ relativePath: string; file: File }>>"
		],
		"saveFile": [
			"saveFile(fileData: File | Blob, fileName?: string): Promise<void>"
		],
		"readFileFromFileSystem": [
			"readFileFromFileSystem(uri: string): Promise<File | undefined>"
		],
		"saveFileToFileSystem": [
			"saveFileToFileSystem(uri: string, fileData: File | Blob, fileName?: string, force?: boolean): Promise<boolean>"
		],
		"listFilesOfFileSystem": [
			"listFilesOfFileSystem(folderPath: string, recursive?: boolean): Promise<Array<ISYS_FileSystemFileList>>"
		],
		"deleteFileInFileSystem": [
			"deleteFileInFileSystem(uri: string, force?: boolean): Promise<boolean>"
		],
		"createDirectoryInFileSystem": [
			"createDirectoryInFileSystem(folderPath: string): Promise<boolean>"
		],
		"existsPathInFileSystem": [
			"existsPathInFileSystem(uri: string): Promise<boolean>"
		],
		"getEdaPath": [
			"getEdaPath(): Promise<string>"
		],
		"getDocumentsPath": [
			"getDocumentsPath(): Promise<string>"
		],
		"getLibrariesPaths": [
			"getLibrariesPaths(): Promise<Array<string>>"
		],
		"getProjectsPaths": [
			"getProjectsPaths(): Promise<Array<string>>"
		],
		"createObjectURL": [
			"createObjectURL(blob: Blob | File): string"
		],
		"revokeObjectURL": [
			"revokeObjectURL(url: string): void"
		]
	},
	"sys_FontManager": {
		"getFontsList": [
			"getFontsList(): Promise<Array<string>>"
		],
		"addFont": [
			"addFont(fontName: string): Promise<boolean>"
		],
		"deleteFont": [
			"deleteFont(fontName: string): Promise<boolean>"
		]
	},
	"sys_FormatConversion": {
		"convertAltiumDesignerLibrariesToEasyEDASingleFile": [
			"convertAltiumDesignerLibrariesToEasyEDASingleFile(file: File | Array<File>): Promise<File | undefined>"
		],
		"convertAltiumDesignerLibrariesToEasyEDAMultiFiles": [
			"convertAltiumDesignerLibrariesToEasyEDAMultiFiles(file: File | Array<File>): Promise<Array<File>>"
		],
		"convertDisaLibrariesToEasyEDASingleFile": [
			"convertDisaLibrariesToEasyEDASingleFile(file: File | Array<File>): Promise<File | undefined>"
		],
		"convertDisaLibrariesToEasyEDAMultiFiles": [
			"convertDisaLibrariesToEasyEDAMultiFiles(file: File | Array<File>): Promise<Array<File>>"
		]
	},
	"sys_HeaderMenu": {
		"insertHeaderMenus": [
			"insertHeaderMenus(headerMenus: ISYS_HeaderMenus): Promise<void>"
		],
		"removeHeaderMenus": [
			"removeHeaderMenus(): void"
		],
		"replaceHeaderMenus": [
			"replaceHeaderMenus(headerMenus: ISYS_HeaderMenus): Promise<void>"
		],
		"removeSystemHeaderMenuItem": [
			"removeSystemHeaderMenuItem(id: Array<string>, props?: { removeTheBeforeDivider?: undefined | false | true; removeTheAfterDivider?: undefined | false | true }): Promise<boolean>"
		],
		"insertSystemHeaderMenuItem": [
			"insertSystemHeaderMenuItem(env: ESYS_HeaderMenuEnvironment, id: Array<string>, props: { title: string; registerFn?: undefined | string; menuItems?: undefined | (null | ISYS_HeaderMenuSub2MenuItem | ISYS_HeaderMenuSub1MenuItem)[]; insertDividerBefore?: undefined | false | true; insertDividerAfter?: undefined | false | true; insertBefore?: undefined | string; crossDividerWhenInsert?: undefined | false | true }): Promise<string | undefined>"
		],
		"insertSystemHeaderMenus": [
			"insertSystemHeaderMenus(headerMenus: ISYS_HeaderMenus): void"
		]
	},
	"sys_I18n": {
		"text": [
			"text(tag: string, namespace?: string, language?: string, ...args: Array<any>): string"
		],
		"getCurrentLanguage": [
			"getCurrentLanguage(): Promise<string>"
		],
		"getAllSupportedLanguages": [
			"getAllSupportedLanguages(): Array<string>"
		],
		"isLanguageSupported": [
			"isLanguageSupported(language: string): boolean"
		],
		"importMultilingual": [
			"importMultilingual(language: string, source: ISYS_LanguageKeyValuePairs): boolean"
		],
		"importMultilingualLanguage": [
			"importMultilingualLanguage(namespace: string, language: string, source: ISYS_LanguageKeyValuePairs): boolean"
		],
		"importMultilingualNamespace": [
			"importMultilingualNamespace(namespace: string, source: ISYS_MultilingualLanguagesData): boolean"
		],
		"addLanguageChangedEventListener": [
			"addLanguageChangedEventListener(id: string, callFn: (newLanguage: string, lastLanguage: string) => void | Promise<void>, onlyOnce: boolean): void"
		],
		"removeEventListener": [
			"removeEventListener(id: string): boolean"
		],
		"isEventListenerAlreadyExist": [
			"isEventListenerAlreadyExist(id: string): boolean"
		]
	},
	"sys_IFrame": {
		"openIFrame": [
			"openIFrame(htmlFileName: string, width?: number, height?: number, id?: string, props?: { maximizeButton?: undefined | false | true; minimizeButton?: undefined | false | true; minimizeStyle?: undefined | 'collapsed' | 'constricted'; buttonCallbackFn?: undefined | ((button: 'close' | 'minimize' | 'maximize') => void | Promise<void>); onBeforeCloseCallFn?: undefined | (() => boolean | undefined | Promise<boolean | undefined>); grayscaleMask?: undefined | false | true; title?: undefined | string; x?: undefined | number; y?: undefined | number }): Promise<boolean>"
		],
		"closeIFrame": [
			"closeIFrame(id?: string): Promise<boolean>"
		],
		"hideIFrame": [
			"hideIFrame(id?: string): Promise<boolean>"
		],
		"showIFrame": [
			"showIFrame(id?: string): Promise<boolean>"
		],
		"isIFrameAlreadyExist": [
			"isIFrameAlreadyExist(id: string): Promise<boolean>"
		]
	},
	"sys_LoadingAndProgressBar": {
		"showProgressBar": [
			"showProgressBar(progress?: number, title?: string): void"
		],
		"destroyProgressBar": [
			"destroyProgressBar(): void"
		],
		"showLoading": [
			"showLoading(): void"
		],
		"destroyLoading": [
			"destroyLoading(): void"
		]
	},
	"sys_Log": {
		"add": [
			"add(message: string, type?: ESYS_LogType): void"
		],
		"clear": [
			"clear(): void"
		],
		"export": [
			"export(types?: ESYS_LogType | Array<ESYS_LogType>): void"
		],
		"sort": [
			"sort(types?: ESYS_LogType | Array<ESYS_LogType>): Promise<Array<ISYS_LogLine>>"
		],
		"find": [
			"find(message: string | Array<string | { text: string; attr?: undefined | { id?: undefined | string; path?: undefined | string; sheet?: undefined | string; pcbid?: undefined | string; type?: undefined | string } }>, types?: ESYS_LogType | Array<ESYS_LogType>): Promise<Array<ISYS_LogLine>>"
		]
	},
	"sys_Math": {
		"containsPoint": [
			"containsPoint(polygon: TSYS_MathPolygonInput, point: ISYS_MathPoint): boolean"
		],
		"distanceToPoint": [
			"distanceToPoint(polygon: TSYS_MathPolygonInput, point: ISYS_MathPoint): number"
		],
		"intersects": [
			"intersects(polygon1: TSYS_MathPolygonInput, polygon2: TSYS_MathPolygonInput): boolean"
		],
		"contains": [
			"contains(polygon1: TSYS_MathPolygonInput, polygon2: TSYS_MathPolygonInput): boolean"
		],
		"getBBox": [
			"getBBox(polygon: TSYS_MathPolygonInput): ISYS_MathBBox"
		],
		"bboxIntersects": [
			"bboxIntersects(bbox1: ISYS_MathBBox, bbox2: ISYS_MathBBox): boolean"
		],
		"calculateArea": [
			"calculateArea(polygon: TSYS_MathPolygonInput): number"
		],
		"calculatePerimeter": [
			"calculatePerimeter(polygon: TSYS_MathPolygonInput): number"
		],
		"getCentroid": [
			"getCentroid(polygon: TSYS_MathPolygonInput): ISYS_MathPoint"
		],
		"translate": [
			"translate(polygon: TSYS_MathPolygonInput, dx: number, dy: number): Array<ISYS_MathPoint>"
		],
		"rotate": [
			"rotate(polygon: TSYS_MathPolygonInput, angle: number, centerX?: number, centerY?: number): Array<ISYS_MathPoint>"
		],
		"scale": [
			"scale(polygon: TSYS_MathPolygonInput, scaleX: number, scaleY?: number, centerX?: number, centerY?: number): Array<ISYS_MathPoint>"
		],
		"union": [
			"union(polygon1: TSYS_MathPolygonInput, polygon2: TSYS_MathPolygonInput): TSYS_MathPolygonGroup"
		],
		"subtract": [
			"subtract(polygon1: TSYS_MathPolygonInput, polygon2: TSYS_MathPolygonInput): TSYS_MathPolygonGroup"
		],
		"intersection": [
			"intersection(polygon1: TSYS_MathPolygonInput, polygon2: TSYS_MathPolygonInput): TSYS_MathPolygonGroup"
		],
		"xor": [
			"xor(polygon1: TSYS_MathPolygonInput, polygon2: TSYS_MathPolygonInput): TSYS_MathPolygonGroup"
		],
		"normalizeToPoints": [
			"normalizeToPoints(input: TSYS_MathPolygonInput): Array<ISYS_MathPoint>"
		],
		"normalizeToD3Polygon": [
			"normalizeToD3Polygon(input: TSYS_MathPolygonInput): Array<[number, number]>"
		],
		"normalizeToMartinez": [
			"normalizeToMartinez(input: TSYS_MathPolygonInput): Array<Array<Array<number>>>"
		]
	},
	"sys_Message": {
		"showToastMessage": [
			"showToastMessage(message: string, messageType?: ESYS_ToastMessageType, timer?: number, bottomPanel?: ESYS_BottomPanelTab, buttonTitle?: string, buttonCallbackFn?: string): void"
		],
		"showFollowMouseTip": [
			"showFollowMouseTip(tip: string, msTimeout?: number): Promise<void>"
		],
		"removeFollowMouseTip": [
			"removeFollowMouseTip(tip?: string): Promise<void>"
		]
	},
	"sys_MessageBox": {
		"showInformationMessage": [
			"showInformationMessage(content: string, title?: string, buttonTitle?: string): void"
		],
		"showConfirmationMessage": [
			"showConfirmationMessage(content: string, title?: string, mainButtonTitle?: string, buttonTitle?: string, callbackFn?: (mainButtonClicked: boolean) => void): void"
		]
	},
	"sys_MessageBus": {
		"createPrivateMessageBus": [
			"createPrivateMessageBus(): void"
		],
		"removePrivateMessageBus": [
			"removePrivateMessageBus(): void"
		],
		"push": [
			"push(topic: string, message: any): void"
		],
		"pushPublic": [
			"pushPublic(topic: string, message: any): void"
		],
		"pull": [
			"pull(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask"
		],
		"pullPublic": [
			"pullPublic(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask"
		],
		"pullAsync": [
			"pullAsync(topic: string): Promise<any>"
		],
		"pullAsyncPublic": [
			"pullAsyncPublic(topic: string): Promise<any>"
		],
		"publish": [
			"publish(topic: string, message: any): void"
		],
		"publishPublic": [
			"publishPublic(topic: string, message: any): void"
		],
		"subscribe": [
			"subscribe(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask"
		],
		"subscribePublic": [
			"subscribePublic(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask"
		],
		"subscribeOnce": [
			"subscribeOnce(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask"
		],
		"subscribeOncePublic": [
			"subscribeOncePublic(topic: string, callbackFn: (message: any) => void): ISYS_MessageBusTask"
		],
		"rpcCall": [
			"rpcCall(topic: string, message?: any, timeout?: number): Promise<any>"
		],
		"rpcCallPublic": [
			"rpcCallPublic(topic: string, message?: any, timeout?: number): Promise<any>"
		],
		"rpcService": [
			"rpcService(topic: string, callbackFn: (...args: Array<any>) => any | Promise<any>): void"
		],
		"rpcServicePublic": [
			"rpcServicePublic(topic: string, callbackFn: (...args: Array<any>) => any | Promise<any>): void"
		]
	},
	"sys_PanelControl": {
		"openLeftPanel": [
			"openLeftPanel(tab?: ESYS_LeftPanelTab): void"
		],
		"closeLeftPanel": [
			"closeLeftPanel(): void"
		],
		"toggleLeftPanelLockState": [
			"toggleLeftPanelLockState(state?: boolean): void"
		],
		"isLeftPanelLocked": [
			"isLeftPanelLocked(): Promise<boolean>"
		],
		"openRightPanel": [
			"openRightPanel(tab?: ESYS_RightPanelTab): void"
		],
		"closeRightPanel": [
			"closeRightPanel(): void"
		],
		"toggleRightPanelLockState": [
			"toggleRightPanelLockState(state?: boolean): void"
		],
		"isRightPanelLocked": [
			"isRightPanelLocked(): Promise<boolean>"
		],
		"openBottomPanel": [
			"openBottomPanel(tab?: ESYS_BottomPanelTab): void"
		],
		"closeBottomPanel": [
			"closeBottomPanel(): void"
		],
		"toggleBottomPanelLockState": [
			"toggleBottomPanelLockState(state?: boolean): void"
		],
		"isBottomPanelLocked": [
			"isBottomPanelLocked(): Promise<boolean>"
		]
	},
	"sys_RightClickMenu": {
		"changeMenu": [
			"changeMenu(menuId: string, menuItems: Array<ISYS_RightClickMenuItem | null>): Promise<void>"
		]
	},
	"sys_Setting": {
		"restoreDefault": [
			"restoreDefault(): Promise<boolean>"
		]
	},
	"sys_ShortcutKey": {
		"registerShortcutKey": [
			"registerShortcutKey(shortcutKey: TSYS_ShortcutKeys, title: string, callbackFn: (shortcutKey: TSYS_ShortcutKeys) => void | Promise<void>, documentType?: Array<ESYS_ShortcutKeyEffectiveEditorRange>, scene?: Array<ESYS_ShortcutKeyEffectiveEditorScene>): Promise<boolean>"
		],
		"unregisterShortcutKey": [
			"unregisterShortcutKey(shortcutKey: TSYS_ShortcutKeys): Promise<boolean>"
		],
		"getShortcutKeys": [
			"getShortcutKeys(includeSystem?: boolean): Promise<Array<{ shortcutKey: TSYS_ShortcutKeys; title: string; documentType: ESYS_ShortcutKeyEffectiveEditorRange[]; scene: ESYS_ShortcutKeyEffectiveEditorScene[] }>>"
		],
		"register": [
			"register(id: string, props: ISYS_ShortcutKeyDataWithCallFn): boolean"
		],
		"unregister": [
			"unregister(id: string): boolean"
		],
		"get": [
			"get(id: string): ISYS_ShortcutKeyDataWithUserDefinedShortcutKey | undefined"
		],
		"getAll": [
			"getAll(): Record<string, ISYS_ShortcutKeyDataWithUserDefinedShortcutKey>"
		]
	},
	"sys_Storage": {
		"getExtensionAllUserConfigs": [
			"getExtensionAllUserConfigs(): Record<string, any>"
		],
		"setExtensionAllUserConfigs": [
			"setExtensionAllUserConfigs(configs: Record<string, any>): Promise<boolean>"
		],
		"clearExtensionAllUserConfigs": [
			"clearExtensionAllUserConfigs(): Promise<boolean>"
		],
		"getExtensionUserConfig": [
			"getExtensionUserConfig(key: string): any | undefined"
		],
		"setExtensionUserConfig": [
			"setExtensionUserConfig(key: string, value: any): Promise<boolean>"
		],
		"deleteExtensionUserConfig": [
			"deleteExtensionUserConfig(key: string): Promise<boolean>"
		]
	},
	"sys_Timer": {
		"setIntervalTimer": [
			"setIntervalTimer(id: string, timeout: number, callFn: (...args: any) => void, ...args: any): boolean"
		],
		"clearIntervalTimer": [
			"clearIntervalTimer(id: string): boolean"
		],
		"setTimeoutTimer": [
			"setTimeoutTimer(id: string, timeout: number, callFn: (...args: any) => void, ...args: any): boolean"
		],
		"clearTimeoutTimer": [
			"clearTimeoutTimer(id: string): boolean"
		]
	},
	"sys_ToastMessage": {
		"showMessage": [
			"showMessage(message: string, messageType?: ESYS_ToastMessageType, timer?: number, bottomPanel?: ESYS_BottomPanelTab, buttonTitle?: string, buttonCallbackFn?: string): void"
		]
	},
	"sys_Tool": {
		"netlistComparison": [
			"netlistComparison(netlist1: string | { projectUuid: string; documentUuid: string } | File, netlist2: string | { projectUuid: string; documentUuid: string } | File): Promise<Array<{ type: 'Net' | 'Component'; object: string; netlist1Name: string[]; netlist2Name: string[] }>>"
		],
		"schematicComparison": [
			"schematicComparison(schematic1: string | { projectUuid: string; schematicUuid: string } | File, schematic2: string | { projectUuid: string; schematicUuid: string } | File): Promise<any>"
		],
		"pcbComparison": [
			"pcbComparison(pcb1: string | { projectUuid: string; pcbUuid: string } | File, pcb2: string | { projectUuid: string; pcbUuid: string } | File, options?: { valUnit?: undefined | ESYS_Unit.MILLIMETER | ESYS_Unit.CENTIMETER | ESYS_Unit.INCH | ESYS_Unit.MIL; deviation?: undefined | number; comparisonSize?: undefined | number }): Promise<ISYS_PcbComparisonResponse>"
		]
	},
	"sys_Unit": {
		"getFrontendDataUnit": [
			"getFrontendDataUnit(): Promise<ESYS_Unit | undefined>"
		],
		"milToMm": [
			"milToMm(mil: number, numberOfDecimals?: number): number"
		],
		"milToInch": [
			"milToInch(mil: number, numberOfDecimals?: number): number"
		],
		"mmToMil": [
			"mmToMil(mm: number, numberOfDecimals?: number): number"
		],
		"mmToInch": [
			"mmToInch(mm: number, numberOfDecimals?: number): number"
		],
		"inchToMil": [
			"inchToMil(inch: number, numberOfDecimals?: number): number"
		],
		"inchToMm": [
			"inchToMm(inch: number, numberOfDecimals?: number): number"
		]
	},
	"sys_WebSocket": {
		"register": [
			"register(id: string, serviceUri: string, receiveMessageCallFn?: (event: MessageEvent<any>) => void | Promise<void>, connectedCallFn?: () => void | Promise<void>, protocols?: string | Array<string>): void"
		],
		"send": [
			"send(id: string, data: string | Blob | BufferSource, extensionUuid?: string): void"
		],
		"close": [
			"close(id: string, code?: number, reason?: string, extensionUuid?: string): void"
		]
	},
	"sys_Window": {
		"open": [
			"open(url: string, target?: ESYS_WindowOpenTarget): void"
		],
		"addEventListener": [
			"addEventListener(type: ESYS_WindowEventType, listener: (ev: any) => any, options?: { capture?: undefined | false | true; once?: undefined | false | true; passive?: undefined | false | true; signal?: undefined | AbortSignal }): ISYS_WindowEventListenerRemovableObject | undefined"
		],
		"removeEventListener": [
			"removeEventListener(removableObject: ISYS_WindowEventListenerRemovableObject): void"
		],
		"openUI": [
			"openUI(uiName: string, args?: Record<string, any>): Promise<void>"
		],
		"getCurrentTheme": [
			"getCurrentTheme(): Promise<ESYS_Theme>"
		],
		"getUrlParam": [
			"getUrlParam(key: string): string | null"
		],
		"getUrlAnchor": [
			"getUrlAnchor(): string"
		],
		"urlPushState": [
			"urlPushState(url: string): void"
		],
		"urlReplaceState": [
			"urlReplaceState(url: string): void"
		],
		"getViewportSize": [
			"getViewportSize(): { width: number; height: number }"
		],
		"hideStartPageSupportFloatBarItems": [
			"hideStartPageSupportFloatBarItems(): Promise<boolean>"
		],
		"hideStartPageQuickStartItems": [
			"hideStartPageQuickStartItems(items: Array<ESYS_StartPageQuickStartItem>): Promise<boolean>"
		]
	}
} as const;
export const API_TYPE_CATALOG = {
	"EDMT_ItemType": [
		"enum EDMT_ItemType { WORKSPACE = 'Workspace', TEAM = 'Team', FOLDER = 'Folder', PROJECT = 'Project', CBB_PROJECT = 'CBB Project', BOARD = 'Board', SCHEMATIC = 'Schematic', CBB_SCHEMATIC = 'CBB Schematic', SCHEMATIC_PAGE = 'Schematic Page', PCB = 'PCB', CBB_PCB = 'CBB PCB', PANEL = 'Panel', }"
	],
	"IDMT_SchematicPageItem": [
		"interface IDMT_SchematicPageItem { /** 项目类型 */ readonly itemType: EDMT_ItemType.SCHEMATIC_PAGE; /** 原理图图页 UUID */ uuid: string; /** 原理图图页名称 */ name: string; /** 所属原理图 UUID */ parentSchematicUuid: string; /** 是否显示明细表 */ showTitleBlock: boolean; /** 明细表数据 */ titleBlockData: Record<string, { showTitle: boolean; showValue: boolean; value: any }>; }"
	],
	"ELIB_LibraryType": [
		"enum ELIB_LibraryType { DEVICE = '3', SYMBOL = '2', FOOTPRINT = '4', CBB = '1', MODEL = '5', PANEL_LIBRARY = '29', SIMULATION_MODEL_NGSPICE = '32', SIMULATION_MODEL_SIMULIDE = '33', }"
	],
	"ILIB_ClassificationIndex": [
		"interface ILIB_ClassificationIndex { /** 库 UUID */ libraryUuid: string; /** 库类型 */ libraryType: ELIB_LibraryType; /** 一级分类 UUID */ primaryClassificationUuid: string; /** 二级分类 UUID */ secondaryClassificationUuid?: string; }"
	],
	"ELIB_SymbolType": [
		"enum ELIB_SymbolType { COMPONENT = 2, NET_FLAG = 18, NET_PORT = 19, DRAWING = 20, NON_ELECTRICAL = 21, SHORT_CIRCUIT_FLAG = 22, OFF_PAGE_CONNECTOR = 25, DIFFERENTIAL_PAIRS_FLAG = 31, CBB_SYMBOL = 17, }"
	],
	"ILIB_SymbolItem": [
		"interface ILIB_SymbolItem { /** 库类型 */ readonly libraryType: ELIB_LibraryType.SYMBOL; /** 符号 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 所属复用模块 UUID，仅复用模块符号存在该属性 */ cbbUuid?: string; /** 符号名称 */ name: string; /** 分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 符号类型 */ type: ELIB_SymbolType; /** 描述 */ description?: string; /** 子部件名称数组 */ subPartNames: []; }"
	],
	"IDMT_SchematicItem": [
		"interface IDMT_SchematicItem { /** 项目类型 */ readonly itemType: EDMT_ItemType.SCHEMATIC | EDMT_ItemType.CBB_SCHEMATIC; /** 原理图 UUID */ uuid: string; /** 原理图名称 */ name: string; /** 下属原理图图页 */ page: Array<IDMT_SchematicPageItem>; /** 所属工程 UUID */ parentProjectUuid: string; /** 所属板子名称 */ parentBoardName?: string; /** 复用模块原理图关联的模块符号 */ cbbSymbol?: ILIB_SymbolItem; }"
	],
	"IDMT_PcbItem": [
		"interface IDMT_PcbItem { /** 项目类型 */ readonly itemType: EDMT_ItemType.PCB | EDMT_ItemType.CBB_PCB; /** PCB UUID */ uuid: string; /** PCB 名称 */ name: string; /** 所属工程 UUID */ parentProjectUuid: string; /** 所属板子名称 */ parentBoardName?: string; }"
	],
	"IDMT_BoardItem": [
		"interface IDMT_BoardItem { /** 项目类型 */ readonly itemType: EDMT_ItemType.BOARD; /** 板子名称 */ name: string; /** 下属原理图 */ schematic: IDMT_SchematicItem; /** 下属 PCB */ pcb: IDMT_PcbItem; /** 所属工程 UUID */ parentProjectUuid: string; }"
	],
	"EDMT_EditorDocumentType": [
		"enum EDMT_EditorDocumentType { HOME = -1, BLANK = 0, PROJECT = 5, SCHEMATIC_PAGE = 1, PCB = 3, PCB_2D_PREVIEW = 12, PCB_3D_PREVIEW = 15, PANEL = 26, PANEL_3D_PREVIEW = 27, SYMBOL_COMPONENT = 2, SYMBOL_NET_FLAG = 18, SYMBOL_NET_PORT = 19, SYMBOL_DRAWING = 20, SYMBOL_NON_ELECTRICAL = 21, SYMBOL_SHORT_CIRCUIT_FLAG = 22, SYMBOL_OFF_PAGE_CONNECTOR_FLAG = 25, SYMBOL_CBB = 17, FOOTPRINT = 4, PANEL_LIBRARY = 29, SIMULATION_SCHEMATIC_PAGE_NGSPICE = 8, SIMULATION_SCHEMATIC_PAGE_SIMULIDE = 9, SIMULATION_SYMBOL_COMPONENT_NGSPICE = 7, SIMULATION_SYMBOL_COMPONENT_SIMULIDE = 32, }"
	],
	"IDMT_EditorTabItem": [
		"interface IDMT_EditorTabItem { /** 标签页标题 */ title: string; /** 标签页 ID */ tabId: string; /** 文档类型 */ documentType: EDMT_EditorDocumentType; /** 标签页是否可拖动 */ draggable: boolean; /** 标签页是否可关闭 */ isAbleDelete: boolean; /** * 标签页是否不使用 I18n 功能（内部功能） * * @internal */ notUseI18n?: boolean; }"
	],
	"EDMT_EditorSplitScreenDirection": [
		"enum EDMT_EditorSplitScreenDirection { HORIZONTAL = 'horizontal', VERTICAL = 'vertical', }"
	],
	"IDMT_EditorSplitScreenItem": [
		"interface IDMT_EditorSplitScreenItem { /** 分屏 ID */ id: string; /** 父级分屏 ID */ fatherId?: string; /** 分屏内标签页 */ tabs?: Array<IDMT_EditorTabItem>; /** 分屏方向 */ direction?: EDMT_EditorSplitScreenDirection; /** 子分屏 */ children?: Array<IDMT_EditorSplitScreenItem>; }"
	],
	"EDMT_IndicatorMarkerType": [
		"enum EDMT_IndicatorMarkerType { POINT = 'point', CIRCLE = 'circle', LINE = 'line', ARC = 'arc', RECTANGLE = 'rectangle', }"
	],
	"IDMT_IndicatorMarkerShape": [
		"interface IDMT_IndicatorMarkerShape { /** 类型 */ type: EDMT_IndicatorMarkerType; /** * 点：坐标 X * * 圆形：圆心 X */ x?: number; /** * 点：坐标 Y * * 圆形：圆心 Y */ y?: number; /** * 圆形：半径 */ r?: number; /** * 线段 | 圆弧：起始点 X */ startX?: number; /** * 线段 | 圆弧：起始点 Y */ startY?: number; /** * 线段 | 圆弧：终止点 X */ endX?: number; /** * 线段 | 圆弧：终止点 Y */ endY?: number; /** * 矩形：上 Y */ top?: number; /** * 矩形：下 Y */ bottom?: number; /** * 矩形：左 X */ left?: number; /** * 矩形：右 X */ right?: number; /** * 圆弧：角度 */ angle?: number; }"
	],
	"EDMT_EditorTabEventType": [
		"enum EDMT_EditorTabEventType { TOGGLE = 'toggle', CLOSE = 'close', OPEN = 'open', }"
	],
	"IDMT_FolderItem": [
		"interface IDMT_FolderItem { /** 项目类型 */ readonly itemType: EDMT_ItemType.FOLDER; /** 文件夹 UUID */ uuid: string; /** 文件夹名称 */ name: string; /** 所属团队 UUID */ teamUuid: string; /** 文件夹描述 */ description?: string; /** 父文件夹 UUID */ parentFolderUuid: string; /** 子文件夹 UUID 列表 */ childrenFoldersUuid?: Array<string>; }"
	],
	"IDMT_PanelItem": [
		"interface IDMT_PanelItem { /** 项目类型 */ readonly itemType: EDMT_ItemType.PANEL; /** 面板 UUID */ uuid: string; /** 面板名称 */ name: string; /** 所属工程 UUID */ parentProjectUuid: string; }"
	],
	"EDMT_ProjectCollaborationMode": [
		"enum EDMT_ProjectCollaborationMode { STRICT = 3, FREE = 1, }"
	],
	"IDMT_BriefProjectItem": [
		"interface IDMT_BriefProjectItem { /** 项目类型 */ readonly itemType: EDMT_ItemType.PROJECT | EDMT_ItemType.CBB_PROJECT; /** 工程 UUID */ uuid: string; /** 工程友好名称 */ friendlyName: string; /** 所属团队 UUID */ teamUuid: string; /** 所属文件夹 UUID */ folderUuid?: string; }"
	],
	"IDMT_ProjectItem": [
		"interface IDMT_ProjectItem extends IDMT_BriefProjectItem { /** 工程链接名称 */ name: string; /** 描述 */ description?: string; /** 工程内文档数据 */ data: Array<IDMT_BoardItem | IDMT_SchematicItem | IDMT_PcbItem | IDMT_PanelItem>; /** 工程协作模式 */ collaborationMode?: EDMT_ProjectCollaborationMode; }"
	],
	"IDMT_EditorDocumentItem": [
		"interface IDMT_EditorDocumentItem { /** 文档类型 */ documentType: EDMT_EditorDocumentType; /** 文档 UUID */ uuid: string; /** 文档的标签页 ID */ tabId: string; /** 文档所属工程 UUID */ parentProjectUuid?: string; /** 库文档所属库 UUID */ parentLibraryUuid?: string; }"
	],
	"IDMT_TeamItem": [
		"interface IDMT_TeamItem { /** 项目类型 */ readonly itemType: EDMT_ItemType.TEAM; /** 团队名称 */ name: string; /** 团队 UUID */ uuid: string; /** 当前用户在团队内的身份（权限组）ID */ identity: number; }"
	],
	"IDMT_WorkspaceItem": [
		"interface IDMT_WorkspaceItem { /** 项目类型 */ readonly itemType: EDMT_ItemType.WORKSPACE; /** 工作区名称 */ name: string; /** 工作区 UUID */ uuid: string; }"
	],
	"ESYS_Unit": [
		"enum ESYS_Unit { MILLIMETER = 'mm', CENTIMETER = 'cm', DECIMETER = 'dm', METER = 'm', INCH = 'inch', IN = 'in', MIL = 'mil', }"
	],
	"ILIB_3DModelItem": [
		"interface ILIB_3DModelItem { /** 库类型 */ readonly libraryType: ELIB_LibraryType.MODEL; /** 3D 模型 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 3D 模型名称 */ name: string; /** 分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 描述 */ description?: string; }"
	],
	"ILIB_3DModelSearchItem": [
		"interface ILIB_3DModelSearchItem { /** 3D 模型 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 排序 */ ordinal: number; /** 3D 模型名称 */ name: string; /** 描述 */ description?: string; /** 更新时间戳 */ updateTimestamp: number; /** 归属 */ ascription: string; /** 前次修改者 */ lastModifiedBy: string; }"
	],
	"ILIB_CbbItem": [
		"interface ILIB_CbbItem { /** 库类型 */ readonly libraryType: ELIB_LibraryType.CBB; /** 复用模块 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 复用模块名称 */ name: string; /** 分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 描述 */ description?: string; /** 下属板子 */ boards: Array<IDMT_BoardItem>; }"
	],
	"ILIB_CbbSearchItem": [
		"interface ILIB_CbbSearchItem { /** 复用模块 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 排序 */ ordinal: number; /** 复用模块名称 */ name: string; /** 描述 */ description?: string; /** 更新时间戳 */ updateTimestamp: number; /** 归属 */ ascription: string; /** 前次修改者 */ lastModifiedBy: string; }"
	],
	"ILIB_DeviceExtendPropertyItem": [
		"interface ILIB_DeviceExtendPropertyItem { /** 名称 */ name?: string; /** 位号 */ designator?: string; /** 加入 BOM */ addIntoBom?: boolean; /** 转到 PCB */ addIntoPcb?: boolean; /** 网络 */ net?: string; /** 制造商 */ manufacturer?: string; /** 制造商编号 */ manufacturerId?: string; /** 供应商 */ supplier?: string; /** 供应商编号 */ supplierId?: string; /** 其它属性 */ otherProperty?: Record<string, boolean | number | string | undefined>; }"
	],
	"ILIB_DeviceAssociationItem": [
		"interface ILIB_DeviceAssociationItem { /** * 符号类型 * * @deprecated 请使用 {@link ILIB_DeviceSearchItem.symbol | symbol} 替代 */ symbolType: ELIB_SymbolType; /** * 符号 UUID * * @deprecated 请使用 {@link ILIB_DeviceSearchItem.symbol | symbol} 替代 */ symbolUuid: string; /** 符号 */ symbol: { type: ELIB_SymbolType; uuid: string; libraryUuid: string }; /** * 封装 UUID * * @deprecated 请使用 {@link ILIB_DeviceSearchItem.footprint | footprint} 替代 */ footprintUuid: string; /** 封装 */ footprint?: { uuid: string; libraryUuid: string }; images?: Array<string>; }"
	],
	"ILIB_DeviceItem": [
		"interface ILIB_DeviceItem { /** 库类型 */ readonly libraryType: ELIB_LibraryType.DEVICE; /** 器件 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 器件名称 */ name: string; /** 器件分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 关联 */ association: ILIB_DeviceAssociationItem; /** 描述 */ description?: string; /** 扩展属性 */ property: ILIB_DeviceExtendPropertyItem; /** 子部件名称数组 */ subPartNames: []; }"
	],
	"ILIB_DeviceSearchItem": [
		"interface ILIB_DeviceSearchItem { /** 器件 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 器件分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 排序 */ ordinal: number; /** 器件名称 */ name: string; /** * 关联符号名称 * * @deprecated 请使用 {@link ILIB_DeviceSearchItem.symbol | symbol} 替代 */ symbolName: string; /** * 关联符号 UUID * * @deprecated 请使用 {@link ILIB_DeviceSearchItem.symbol | symbol} 替代 */ symbolUuid: string; /** 关联符号 */ symbol: { name: string; uuid: string; libraryUuid: string }; /** * 关联封装名称 * * @deprecated 请使用 {@link ILIB_DeviceSearchItem.footprint | footprint} 替代 */ footprintName?: string; /** * 关联封装 UUID * * @deprecated 请使用 {@link ILIB_DeviceSearchItem.footprint | footprint} 替代 */ footprintUuid: string; /** 关联封装 */ footprint?: { name: string; uuid: string; libraryUuid: string }; /** * 关联 3D 模型名称 * * @deprecated 请使用 {@link ILIB_DeviceSearchItem.model3D | model3D} 替代 */ model3DName?: string; /** * 关联 3D 模型 UUID * * @deprecated 请使用 {@link ILIB_DeviceSearchItem.model3D | model3D} 替代 */ model3DUuid: string; /** 关联 3D 模型 */ model3D?: { name: string; uuid: string; libraryUuid: string }; /** 关联图片 UUID */ imageUuid?: string | string[]; /** 描述 */ description?: string; /** 其它属性 */ otherProperty?: Record<string, boolean | number | string | undefined>; }"
	],
	"ILIB_DevicePropertiesForSearch": [
		"interface ILIB_DevicePropertiesForSearch { /** 器件名称 */ name?: string; /** 值 */ value?: string; /** 关联符号名称 */ symbolName?: string; /** 关联封装名称 */ footprintName?: string; /** 供应商封装名称 */ supplierFootprint?: string; /** 供应商编号 */ supplierId?: string; /** 料号 */ partNumber?: string; /** 元件编码 */ partCode?: string; }"
	],
	"ILIB_FootprintItem": [
		"interface ILIB_FootprintItem { /** 库类型 */ readonly libraryType: ELIB_LibraryType.FOOTPRINT; /** 封装 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 封装名称 */ name: string; /** 分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 描述 */ description?: string; }"
	],
	"ILIB_FootprintSearchItem": [
		"interface ILIB_FootprintSearchItem { /** 封装 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 排序 */ ordinal: number; /** 封装名称 */ name: string; /** 描述 */ description?: string; /** 更新时间戳 */ updateTimestamp: number; /** 归属 */ ascription: string; /** 前次修改者 */ lastModifiedBy: string; }"
	],
	"ILIB_FootprintPropertiesForSearch": [
		"interface ILIB_FootprintPropertiesForSearch { /** 封装名称 */ name?: string; }"
	],
	"ILIB_LibraryInfo": [
		"interface ILIB_LibraryInfo { /** 库名称 */ name: string; /** 库 UUID */ uuid: string; }"
	],
	"ILIB_ExtendLibraryClassificationIndex": [
		"interface ILIB_ExtendLibraryClassificationIndex { /** 一级分类名称 */ primaryClassificationName?: string; /** 一级分类 UUID */ primaryClassificationUuid?: string; /** 二级分类名称 */ secondaryClassificationName?: string; /** 二级分类 UUID */ secondaryClassificationUuid?: string; }"
	],
	"ILIB_ExtendLibrarySearchProperty": [
		"interface ILIB_ExtendLibrarySearchProperty<T> { /** 页数 */ page?: number; /** 单页条目数 */ pageSize?: number; /** 查询参数 */ query: T & { wd?: undefined | string; listByTitles?: undefined | string[]; classification?: undefined | string[] | ILIB_ExtendLibraryClassificationIndex }; }"
	],
	"ILIB_ExtendLibrarySearchResult": [
		"interface ILIB_ExtendLibrarySearchResult<T> { /** 总条目数 */ count: number; /** 结果列表 */ lists: Array<T>; /** 当前页数 */ page: number; /** 单页条目数 */ pageSize: number; /** 总页数 */ totalPage: number; }"
	],
	"ILIB_ExtendLibraryFunctions": [
		"interface ILIB_ExtendLibraryFunctions { /** * 获取详细信息 * * @param uuid - UUID（或以 name 作为 uuid，由外部库扩展开发者实现） * @returns 库元素详细信息 */ getDetail: (uuid: string) => Promise<any>; /** * 获取分类树 * * @returns 分类树 */ getClassificationTree: () => Promise<Array<{ name: string; uuid?: undefined | string; children?: undefined | ({ name: string; uuid?: undefined | string })[] }>>; /** * 获取列表 * * @param props - 搜索参数 * @returns 库元素列表 */ getList: (props: ILIB_ExtendLibrarySearchProperty<any>) => Promise<ILIB_ExtendLibrarySearchResult<any>>; }"
	],
	"ILIB_ExtendLibraryItemIndex": [
		"interface ILIB_ExtendLibraryItemIndex { /** 库 UUID */ uuid?: string; /** 库名称 */ name: string; }"
	],
	"ILIB_ExtendLibraryItem": [
		"interface ILIB_ExtendLibraryItem extends ILIB_ExtendLibraryItemIndex { /** 库文件地址 */ url?: string; /** 库文件数据 */ data?: string | Blob; }"
	],
	"ELIB_PreviewType": [
		"enum ELIB_PreviewType { SYMBOL = 'S', FOOTPRINT = 'F', PRODUCT = 'P', MODEL_3D = '3D', }"
	],
	"ILIB_ExtendLibraryDeviceFunctions": [
		"interface ILIB_ExtendLibraryDeviceFunctions extends ILIB_ExtendLibraryFunctions { getList: (props: ILIB_ExtendLibrarySearchProperty<{ attributes?: undefined | Record<string, string>; symbolType?: undefined | ELIB_SymbolType.COMPONENT | ELIB_SymbolType.NET_FLAG | ELIB_SymbolType.NET_PORT | ELIB_SymbolType.DRAWING | ELIB_SymbolType.NON_ELECTRICAL | ELIB_SymbolType.SHORT_CIRCUIT_FLAG | ELIB_SymbolType.OFF_PAGE_CONNECTOR | ELIB_SymbolType.DIFFERENTIAL_PAIRS_FLAG | ELIB_SymbolType.CBB_SYMBOL }>) => Promise<ILIB_ExtendLibrarySearchResult<ILIB_ExtendLibraryItemIndex & { classification?: undefined | string[] | ILIB_ExtendLibraryClassificationIndex; symbol?: undefined | ILIB_ExtendLibraryItem & { symbolType: ELIB_SymbolType }; footprint?: undefined | ILIB_ExtendLibraryItem; symbols?: undefined | (ILIB_ExtendLibraryItem & { symbolType: ELIB_SymbolType })[]; footprints?: undefined | ILIB_ExtendLibraryItem[]; model3d?: undefined | ILIB_ExtendLibraryItemIndex & { adjustment?: undefined | { size?: undefined | { x: number; y: number; z: number }; rotation?: undefined | { x: number; y: number; z: number }; offset?: undefined | { x: number; y: number; z: number } } }; images?: undefined | ILIB_ExtendLibraryItem[]; value?: undefined | string; supplierPart?: undefined | string; manufacturer?: undefined | string; description?: undefined | string; updateTime?: undefined | number; createTime?: undefined | number; attributes?: undefined | Record<string, string> }>>; /** * 获取支持的符号类型 * * @returns 符号类型数组 */ getSupportedSymbolTypes: () => Promise<Array<ELIB_SymbolType>>; /** * 获取支持的预览类型 * * @returns 预览类型数组 */ getSupportedPreviewTypes: () => Promise<Array<ELIB_PreviewType>>; }"
	],
	"ILIB_ExtendLibraryUserIndex": [
		"interface ILIB_ExtendLibraryUserIndex { /** 用户名称 */ name?: string; /** 嘉立创 EDA 系统内的用户 UUID */ uuid?: string; }"
	],
	"ILIB_ExtendLibrarySearchResultDataLine": [
		"interface ILIB_ExtendLibrarySearchResultDataLine { classification?: ILIB_ExtendLibraryClassificationIndex | Array<string>; description?: string; version?: string; updateTime?: number; createTime?: number; creator?: ILIB_ExtendLibraryUserIndex; modifier?: ILIB_ExtendLibraryUserIndex; owner?: ILIB_ExtendLibraryUserIndex; }"
	],
	"ILIB_ExtendLibrarySymbolFunctions": [
		"interface ILIB_ExtendLibrarySymbolFunctions extends ILIB_ExtendLibraryFunctions { getList: (props: ILIB_ExtendLibrarySearchProperty<{ symbolType?: undefined | ELIB_SymbolType.COMPONENT | ELIB_SymbolType.NET_FLAG | ELIB_SymbolType.NET_PORT | ELIB_SymbolType.DRAWING | ELIB_SymbolType.NON_ELECTRICAL | ELIB_SymbolType.SHORT_CIRCUIT_FLAG | ELIB_SymbolType.OFF_PAGE_CONNECTOR | ELIB_SymbolType.DIFFERENTIAL_PAIRS_FLAG | ELIB_SymbolType.CBB_SYMBOL }>) => Promise<ILIB_ExtendLibrarySearchResult<ILIB_ExtendLibraryItem & ILIB_ExtendLibrarySearchResultDataLine & { symbolType: ELIB_SymbolType }>>; /** * 获取支持的符号类型 * * @returns 符号类型数组 */ getSupportedSymbolTypes: () => Promise<Array<ELIB_SymbolType>>; }"
	],
	"ILIB_ExtendLibraryFootprintFunctions": [
		"interface ILIB_ExtendLibraryFootprintFunctions extends ILIB_ExtendLibraryFunctions { getList: (props: ILIB_ExtendLibrarySearchProperty<{}>) => Promise<ILIB_ExtendLibrarySearchResult<ILIB_ExtendLibraryItem & ILIB_ExtendLibrarySearchResultDataLine>>; }"
	],
	"ILIB_ExtendLibraryCbbFunctions": [
		"interface ILIB_ExtendLibraryCbbFunctions extends ILIB_ExtendLibraryFunctions { getList: (props: any) => Promise<ILIB_ExtendLibrarySearchResult<ILIB_ExtendLibraryItem & ILIB_ExtendLibrarySearchResultDataLine & { schematics?: undefined | ({ uuid: string; name: string; updateTime: string; description?: undefined | string })[]; pcbs?: undefined | ({ uuid: string; name: string; updateTime: number; thumb?: undefined | string; createTime?: undefined | number; creator?: undefined | ILIB_ExtendLibraryUserIndex; modifier?: undefined | ILIB_ExtendLibraryUserIndex; description?: undefined | string })[]; boards?: undefined | { pcbUuid: string; schUuid: string; name: string }[]; sheets?: undefined | ({ uuid: string; name: string; belongSchematicUuid: string; updateTime: number; thumb?: undefined | string; createTime?: undefined | number; creator?: undefined | ILIB_ExtendLibraryUserIndex; modifier?: undefined | ILIB_ExtendLibraryUserIndex; description?: undefined | string })[] }>>; }"
	],
	"ILIB_ExtendLibrary3DModelFunctions": [
		"interface ILIB_ExtendLibrary3DModelFunctions extends ILIB_ExtendLibraryFunctions { getList: (props: ILIB_ExtendLibrarySearchProperty<{}>) => Promise<ILIB_ExtendLibrarySearchResult<ILIB_ExtendLibraryItemIndex & ILIB_ExtendLibrarySearchResultDataLine & { modelType: 'step' }>>; }"
	],
	"ILIB_PanelLibraryItem": [
		"interface ILIB_PanelLibraryItem { /** 库类型 */ readonly libraryType: ELIB_LibraryType.PANEL_LIBRARY; /** 面板库 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 面板库名称 */ name: string; /** 分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 描述 */ description?: string; }"
	],
	"ILIB_PanelLibrarySearchItem": [
		"interface ILIB_PanelLibrarySearchItem { /** 面板库 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 排序 */ ordinal: number; /** 面板库名称 */ name: string; /** 描述 */ description?: string; /** 更新时间戳 */ updateTimestamp: number; /** 归属 */ ascription: string; /** 前次修改者 */ lastModifiedBy: string; }"
	],
	"ILIB_LibraryItem": [
		"interface ILIB_LibraryItem { /** UUID */ uuid: string; /** 库类型 */ libraryType: ELIB_LibraryType; /** 所属库 UUID */ libraryUuid?: string; }"
	],
	"ELIB_SimulationModelType": [
		"enum ELIB_SimulationModelType { NGSPICE = 'Ngspice', SIMULIDE = 'SimulIDE', }"
	],
	"ILIB_SimulationModelItem": [
		"interface ILIB_SimulationModelItem { /** 库类型 */ readonly libraryType: ELIB_LibraryType.SIMULATION_MODEL_NGSPICE | ELIB_LibraryType.SIMULATION_MODEL_SIMULIDE; /** 仿真模型 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 仿真模型名称 */ name: string; /** 仿真模型数据 */ modelData: string; /** 仿真模型分类 */ modelCategory: string; /** 仿真模型引脚 */ modelPin: string; /** 分类 */ classification?: Array<string>; /** 仿真模型类型 */ type: ELIB_SimulationModelType; /** 描述 */ description?: string; }"
	],
	"ILIB_SimulationModelSearchItem": [
		"interface ILIB_SimulationModelSearchItem { /** 仿真模型 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 分类 */ classification?: Array<string>; /** 排序 */ ordinal: number; /** 仿真模型名称 */ name: string; /** 仿真模型类型 */ type: ELIB_SimulationModelType; /** 描述 */ description?: string; /** 更新时间戳 */ updateTimestamp: number; /** 归属 */ ascription: string; /** 前次修改者 */ lastModifiedBy: string; }"
	],
	"ILIB_SymbolSearchItem": [
		"interface ILIB_SymbolSearchItem { /** 符号 UUID */ uuid: string; /** 所属库 UUID */ libraryUuid: string; /** 分类 */ classification?: ILIB_ClassificationIndex | Array<string>; /** 排序 */ ordinal: number; /** 符号名称 */ name: string; /** 符号类型 */ type: ELIB_SymbolType; /** 描述 */ description?: string; /** 更新时间戳 */ updateTimestamp: number; /** 归属 */ ascription: string; /** 前次修改者 */ lastModifiedBy: string; }"
	],
	"ILIB_SymbolPropertiesForSearch": [
		"interface ILIB_SymbolPropertiesForSearch { /** 符号名称 */ name?: string; }"
	],
	"EPCB_DocumentRatlineCalculatingActiveStatus": [
		"enum EPCB_DocumentRatlineCalculatingActiveStatus { ACTIVE = 'active', INACTIVE = 'inactive', }"
	],
	"EPCB_DocumentCanvasUpdateCalculationActiveStatus": [
		"enum EPCB_DocumentCanvasUpdateCalculationActiveStatus { ACTIVE = 'active', INACTIVE = 'inactive', }"
	],
	"EPCB_PrimitiveType": [
		"enum EPCB_PrimitiveType { ARC = 'Arc', COMPONENT = 'Component', PAD = 'Pad', COMPONENT_PAD = 'ComponentPad', POLYLINE = 'Polyline', POUR = 'Pour', FILL = 'Fill', REGION = 'Region', LINE = 'Line', VIA = 'Via', DIMENSION = 'Dimension', IMAGE = 'Image', OBJECT = 'Object', POURED = 'Poured', STRING = 'String', ATTRIBUTE = 'Attribute', }"
	],
	"IPCB_Primitive": [
		"interface IPCB_Primitive { getState_PrimitiveType: () => EPCB_PrimitiveType; getState_PrimitiveId: () => string; create: () => IPCB_Primitive | Promise<IPCB_Primitive>; toAsync: () => IPCB_Primitive; toSync: () => IPCB_Primitive; isAsync: () => boolean; reset: () => IPCB_Primitive | Promise<IPCB_Primitive>; done: () => IPCB_Primitive | Promise<IPCB_Primitive>; }"
	],
	"EPCB_AutoRoutingCornerStyle": [
		"enum EPCB_AutoRoutingCornerStyle { DEGREE_45 = 0, DEGREE_90 = 1, }"
	],
	"EPCB_AutoRoutingExistingPrimitiveMode": [
		"enum EPCB_AutoRoutingExistingPrimitiveMode { KEEP = 'keep', REMOVE = 'remove', }"
	],
	"EPCB_AutoRoutingOptimization": [
		"enum EPCB_AutoRoutingOptimization { COMPLETION = 1, FASTER = 0, }"
	],
	"EPCB_LayerId": [
		"enum EPCB_LayerId { TOP = 1, TOP_SILKSCREEN = 3, TOP_SOLDER_MASK = 5, TOP_PASTE_MASK = 7, TOP_ASSEMBLY = 9, TOP_STIFFENER = 58, BOTTOM = 2, BOTTOM_SILKSCREEN = 4, BOTTOM_SOLDER_MASK = 6, BOTTOM_PASTE_MASK = 8, BOTTOM_ASSEMBLY = 10, BOTTOM_STIFFENER = 59, BOARD_OUTLINE = 11, MULTI = 12, DOCUMENT = 13, MECHANICAL = 14, RATLINE = 57, INNER_1 = 15, INNER_2, INNER_3, INNER_4, INNER_5, INNER_6, INNER_7, INNER_8, INNER_9, INNER_10, INNER_11, INNER_12, INNER_13, INNER_14, INNER_15, INNER_16, INNER_17, INNER_18, INNER_19, INNER_20, INNER_21, INNER_22, INNER_23, INNER_24, INNER_25, INNER_26, INNER_27, INNER_28, INNER_29, INNER_30 = 44, CUSTOM_1 = 71, CUSTOM_2, CUSTOM_3, CUSTOM_4, CUSTOM_5, CUSTOM_6, CUSTOM_7, CUSTOM_8, CUSTOM_9, CUSTOM_10, CUSTOM_11, CUSTOM_12, CUSTOM_13, CUSTOM_14, CUSTOM_15, CUSTOM_16, CUSTOM_17, CUSTOM_18, CUSTOM_19, CUSTOM_20, CUSTOM_21, CUSTOM_22, CUSTOM_23, CUSTOM_24, CUSTOM_25, CUSTOM_26, CUSTOM_27, CUSTOM_28, CUSTOM_29, CUSTOM_30 = 100, SUBSTRATE_1 = 101, HOLE = 47, COMPONENT_SHAPE = 48, COMPONENT_MARKING = 49, PIN_SOLDERING = 50, PIN_FLOATING = 51, COMPONENT_MODEL = 52, SHELL_3D_OUTLINE = 53, SHELL_3D_TOP = 54, SHELL_3D_BOTTOM = 55, DRILL_DRAWING = 56, }"
	],
	"TPCB_LayersOfInner": [
		"type TPCB_LayersOfInner = EPCB_LayerId.INNER_1 | EPCB_LayerId.INNER_2 | EPCB_LayerId.INNER_3 | EPCB_LayerId.INNER_4 | EPCB_LayerId.INNER_5 | EPCB_LayerId.INNER_6 | EPCB_LayerId.INNER_7 | EPCB_LayerId.INNER_8 | EPCB_LayerId.INNER_9 | EPCB_LayerId.INNER_10 | EPCB_LayerId.INNER_11 | EPCB_LayerId.INNER_12 | EPCB_LayerId.INNER_13 | EPCB_LayerId.INNER_14 | EPCB_LayerId.INNER_15 | EPCB_LayerId.INNER_16 | EPCB_LayerId.INNER_17 | EPCB_LayerId.INNER_18 | EPCB_LayerId.INNER_19 | EPCB_LayerId.INNER_20 | EPCB_LayerId.INNER_21 | EPCB_LayerId.INNER_22 | EPCB_LayerId.INNER_23 | EPCB_LayerId.INNER_24 | EPCB_LayerId.INNER_25 | EPCB_LayerId.INNER_26 | EPCB_LayerId.INNER_27 | EPCB_LayerId.INNER_28 | EPCB_LayerId.INNER_29 | EPCB_LayerId.INNER_30;"
	],
	"TPCB_LayersOfCopper": [
		"type TPCB_LayersOfCopper = TPCB_LayersOfInner | EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM;"
	],
	"IPCB_AutoRoutingProps": [
		"interface IPCB_AutoRoutingProps { /** * 布线网络 * * @remarks 指定需要参与自动布线的网络名称数组；如不传入或传入空数组，则对所有未布线的网络进行自动布线 */ RoutingNets?: 'selected' | 'selectedComponents' | Array<string>; /** * 布线拐角风格 * * @remarks 指定自动布线使用的拐角风格，默认为 45 度 */ cornerStyle?: EPCB_AutoRoutingCornerStyle; /** * 已有导线/过孔的处理方式 * * @remarks 指定对画布上已有导线和过孔的处理方式，默认为保留 */ existingPrimitiveMode?: EPCB_AutoRoutingExistingPrimitiveMode; /** * 效果优先级 * * @remarks 指定自动布线的优化目标，默认为布通率 */ optimization?: EPCB_AutoRoutingOptimization; /** * 布线图层 * * @remarks 指定允许参与自动布线的图层 ID 数组；如不传入，则使用当前 PCB 的所有可用信号层 */ layers?: Array<TPCB_LayersOfCopper>; /** * 忽略网络 * * @remarks 指定需要忽略（不参与自动布线）的网络名称数组；如不传入，则不忽略任何网络 */ ignoreNets?: Array<string>; }"
	],
	"IPCB_AutoRoutingResult": [
		"interface IPCB_AutoRoutingResult { /** 自动布线是否成功启动 */ success: boolean; /** 参与自动布线的网络总数 */ totalNetsCount: number; /** 成功完成布线的网络数量 */ successNetsCount: number; /** 未能完成布线的网络名称列表 */ failedNets: Array<string>; /** 自动布线耗时（毫秒） */ duration: number; }"
	],
	"IPCB_AutoLayoutResult": [
		"interface IPCB_AutoLayoutResult { /** 自动布局是否成功启动 */ success: boolean; /** 参与自动布局的器件总数 */ totalComponentsCount: number; /** 成功完成布局的器件数量 */ successComponentsCount: number; /** 未能完成布局的器件图元 ID 列表 */ failedComponents: Array<string>; /** 自动布局耗时（毫秒） */ duration: number; }"
	],
	"IPCB_EqualLengthNetGroupItem": [
		"interface IPCB_EqualLengthNetGroupItem { /** 等长网络组名称 */ name: string; /** 网络名称数组 */ nets: Array<string>; /** 等长网络组颜色 */ color: { r: number; g: number; b: number; alpha: number } | null; }"
	],
	"IPCB_NetClassItem": [
		"interface IPCB_NetClassItem { /** 网络类名称 */ name: string; /** 网络名称数组 */ nets: Array<string>; /** 网络类颜色 */ color: { r: number; g: number; b: number; alpha: number } | null; }"
	],
	"IPCB_DifferentialPairItem": [
		"interface IPCB_DifferentialPairItem { /** 差分对名称 */ name: string; /** 正网络 */ positiveNet: string; /** 负网络 */ negativeNet: string; }"
	],
	"IPCB_PadPairGroupItem": [
		"interface IPCB_PadPairGroupItem { /** 焊盘对组名称 */ name: string; /** 焊盘对数组 */ padPairs: Array<[string, string]>; }"
	],
	"IPCB_PadPairMinWireLengthItem": [
		"interface IPCB_PadPairMinWireLengthItem { /** 焊盘对数组 */ padPair: [string, string]; /** 最短导线长度 */ minWireLength: number; }"
	],
	"EPCB_MouseEventType": [
		"enum EPCB_MouseEventType { SELECTED = 'selected', CLEAR_SELECTED = 'clearSelected', MOVE = 'move', }"
	],
	"EPCB_PrimitiveEventType": [
		"enum EPCB_PrimitiveEventType { DELETE = 'delete', CREATE = 'add', MODIFY = 'modify', }"
	],
	"EPCB_NetEventType": [
		"enum EPCB_NetEventType { ADD = 'add', REMOVE = 'remove', SELECTED = 'selected', }"
	],
	"EPCB_LayerType": [
		"enum EPCB_LayerType { SIGNAL = 'SIGNAL', INTERNAL_ELECTRICAL = 'PLANE', SILKSCREEN = 'SILKSCREEN', SOLDER_MASK = 'SOLDER_MASK', PASTE_MASK = 'PASTE_MASK', ASSEMBLY = 'ASSEMBLY', OTHER = 'OTHER', CUSTOM = 'CUSTOM', }"
	],
	"EPCB_LayerStatus": [
		"enum EPCB_LayerStatus { NOT_USED = 0, SHOW = 1, HIDDEN = 2, }"
	],
	"IPCB_LayerItem": [
		"interface IPCB_LayerItem { /** 图层 ID */ id: EPCB_LayerId; /** 名称 */ name: string; /** 类型 */ type: EPCB_LayerType; /** 颜色（RGB HEX 格式） */ color: string; /** 透明度（%） */ transparency: number; /** 非激活颜色（RGB HEX 格式） */ inactiveColor: string; /** 非激活透明度（%） */ inactiveTransparency: number; /** 层状态 */ layerStatus: EPCB_LayerStatus; /** 是否锁定 */ locked: boolean; }"
	],
	"TPCB_LayersOfCustom": [
		"type TPCB_LayersOfCustom = EPCB_LayerId.CUSTOM_1 | EPCB_LayerId.CUSTOM_2 | EPCB_LayerId.CUSTOM_3 | EPCB_LayerId.CUSTOM_4 | EPCB_LayerId.CUSTOM_5 | EPCB_LayerId.CUSTOM_6 | EPCB_LayerId.CUSTOM_7 | EPCB_LayerId.CUSTOM_8 | EPCB_LayerId.CUSTOM_9 | EPCB_LayerId.CUSTOM_10 | EPCB_LayerId.CUSTOM_11 | EPCB_LayerId.CUSTOM_12 | EPCB_LayerId.CUSTOM_13 | EPCB_LayerId.CUSTOM_14 | EPCB_LayerId.CUSTOM_15 | EPCB_LayerId.CUSTOM_16 | EPCB_LayerId.CUSTOM_17 | EPCB_LayerId.CUSTOM_18 | EPCB_LayerId.CUSTOM_19 | EPCB_LayerId.CUSTOM_20 | EPCB_LayerId.CUSTOM_21 | EPCB_LayerId.CUSTOM_22 | EPCB_LayerId.CUSTOM_23 | EPCB_LayerId.CUSTOM_24 | EPCB_LayerId.CUSTOM_25 | EPCB_LayerId.CUSTOM_26 | EPCB_LayerId.CUSTOM_27 | EPCB_LayerId.CUSTOM_28 | EPCB_LayerId.CUSTOM_29 | EPCB_LayerId.CUSTOM_30;"
	],
	"TPCB_LayersInTheSelectable": [
		"type TPCB_LayersInTheSelectable = TPCB_LayersOfInner | TPCB_LayersOfCustom | EPCB_LayerId.TOP | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_PASTE_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.TOP_STIFFENER | EPCB_LayerId.BOTTOM | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_PASTE_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.BOTTOM_STIFFENER | EPCB_LayerId.BOARD_OUTLINE | EPCB_LayerId.MULTI | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.DRILL_DRAWING | EPCB_LayerId.RATLINE | EPCB_LayerId.COMPONENT_SHAPE | EPCB_LayerId.COMPONENT_MARKING | EPCB_LayerId.PIN_SOLDERING | EPCB_LayerId.PIN_FLOATING | EPCB_LayerId.SHELL_3D_OUTLINE | EPCB_LayerId.SHELL_3D_TOP | EPCB_LayerId.SHELL_3D_BOTTOM;"
	],
	"TPCB_NumberOfCopperLayers": [
		"type TPCB_NumberOfCopperLayers = 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 30 | 32;"
	],
	"EPCB_LayerColorConfiguration": [
		"enum EPCB_LayerColorConfiguration { JLCEDA = 1, EASYEDA = 1, ALTIUM_DESIGNER = 2, PADS = 3, KICAD = 4, }"
	],
	"EPCB_PcbPlateType": [
		"enum EPCB_PcbPlateType { NORMAL = 1, FPC = 2, }"
	],
	"TPCB_LayerTypesOfInnerLayer": [
		"type TPCB_LayerTypesOfInnerLayer = EPCB_LayerType.SIGNAL | EPCB_LayerType.INTERNAL_ELECTRICAL;"
	],
	"EPCB_InactiveLayerDisplayMode": [
		"enum EPCB_InactiveLayerDisplayMode { NORMAL_BRIGHTNESS = 0, TURN_GRAY = 1, HIDE = 2, }"
	],
	"IPCB_PhysicalStackingConfiguration": [
		"interface IPCB_PhysicalStackingConfiguration { /** 物理叠层配置名称 */ name: string; /** 叠层列表 */ list: Array<Record<string, unknown>>; /** 总叠层数 */ layerCount: number; }"
	],
	"IPCB_SubstratePhysicalProperties": [
		"interface IPCB_SubstratePhysicalProperties { /** 铜箔层数 */ numberOfLayers: TPCB_NumberOfCopperLayers; /** 基板材料 */ substrateMaterial: 'Common' | 'FPC Flexible'; }"
	],
	"IPCB_BomPropertiesTableColumns": [
		"interface IPCB_BomPropertiesTableColumns { /** 属性 */ property: string; /** 显示名称 */ title?: string; /** 排序规则 */ sort?: null | 'asc' | 'desc'; /** 是否分组 */ group?: null | 'Yes' | 'No'; /** 排列权重（大权重优先在 BOM 的左侧） */ orderWeight?: number; }"
	],
	"ESYS_NetlistType": [
		"enum ESYS_NetlistType { ALLEGRO = 'Allegro', PADS = 'PADS', PROTEL2 = 'Protel2', JLCEDA_PRO = 'JLCEDA', EASYEDA_PRO = 'EasyEDA', ALTIUM_DESIGNER = 'Protel2', DISA = 'DISA', DISA_SIMULATION = 'DSNET', }"
	],
	"EPCB_PdfOutputMethod": [
		"enum EPCB_PdfOutputMethod { MULTI_PAGE_PDF = 'paged', MULTIPLE_SINGLE_PAGE_PDF = 'separated', SINGLE_PAGE_PDF = 'merged', }"
	],
	"TPCB_PolygonSourceArray": [
		"type TPCB_PolygonSourceArray = Array<'L' | 'ARC' | 'CARC' | 'C' | 'R' | 'CIRCLE' | number>;"
	],
	"IPCB_DiscretizeOptions": [
		"interface IPCB_DiscretizeOptions { /** * 弦高容差，即弧/曲线被弦（相邻离散点连线）近似时允许的最大偏差 * * @remarks 容差越小，离散点越密集，对曲线近似越精确；单位与多边形坐标一致 */ tolerance?: number; }"
	],
	"IPCB_DiscretizedPoint": [
		"interface IPCB_DiscretizedPoint { /** X 坐标 */ x: number; /** Y 坐标 */ y: number; }"
	],
	"IPCB_NetInfo": [
		"interface IPCB_NetInfo { /** 网络名称 */ net: string; /** 颜色 */ color: { r: number; g: number; b: number; alpha: number } | null; /** 长度 */ length: number; }"
	],
	"IPCB_PrimitiveAPI": [
		"interface IPCB_PrimitiveAPI { create: (...args: any[]) => IPCB_Primitive | undefined | Promise<IPCB_Primitive> | Promise<IPCB_Primitive | undefined>; delete: (primitiveIds: string | any | Array<string> | Array<any>) => boolean | Promise<boolean>; modify: (primitiveId: string | any, ...args: any[]) => IPCB_Primitive | undefined | Promise<IPCB_Primitive> | Promise<IPCB_Primitive | undefined>; get: ((primitiveIds: string) => IPCB_Primitive | undefined | Promise<IPCB_Primitive | undefined>) & ((primitiveIds: string[]) => Array<IPCB_Primitive> | Promise<Array<IPCB_Primitive>>); getAllPrimitiveId: (...args: any[]) => Array<string> | Promise<Array<string>>; getAll: (...args: any[]) => Array<IPCB_Primitive> | Promise<Array<IPCB_Primitive>>; }"
	],
	"TPCB_LayersOfLine": [
		"type TPCB_LayersOfLine = TPCB_LayersOfCopper | TPCB_LayersOfCustom | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_PASTE_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_PASTE_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.BOARD_OUTLINE | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.DRILL_DRAWING;"
	],
	"EPCB_PrimitiveArcInteractiveMode": [
		"enum EPCB_PrimitiveArcInteractiveMode { TWO_POINT_ARC = 1, CENTER_ARC = 2, }"
	],
	"EPCB_PrimitiveViaType": [
		"enum EPCB_PrimitiveViaType { VIA = 0, BLIND = 1, SUTURE = 2, }"
	],
	"IPCB_PrimitiveSolderMaskAndPasteMaskExpansion": [
		"interface IPCB_PrimitiveSolderMaskAndPasteMaskExpansion { /** 顶层阻焊扩展 */ topSolderMask?: number; /** 底层阻焊扩展 */ bottomSolderMask?: number; /** 顶层助焊扩展 */ topPasteMask?: number; /** 底层助焊扩展 */ bottomPasteMask?: number; }"
	],
	"TPCB_LayersOfImage": [
		"type TPCB_LayersOfImage = TPCB_LayersOfCopper | TPCB_LayersOfCustom | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.DRILL_DRAWING;"
	],
	"EPCB_PrimitiveStringAlignMode": [
		"enum EPCB_PrimitiveStringAlignMode { LEFT_TOP = 1, LEFT_MIDDLE = 2, LEFT_BOTTOM = 3, CENTER_TOP = 4, CENTER = 5, CENTER_BOTTOM = 6, RIGHT_TOP = 7, RIGHT_MIDDLE = 8, RIGHT_BOTTOM = 9, }"
	],
	"TPCB_LayersOfComponent": [
		"type TPCB_LayersOfComponent = EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM;"
	],
	"TPCB_LayersOfPad": [
		"type TPCB_LayersOfPad = EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM | EPCB_LayerId.MULTI;"
	],
	"EPCB_PrimitivePadShapeType": [
		"enum EPCB_PrimitivePadShapeType { ELLIPSE = 'ELLIPSE', OBLONG = 'OVAL', RECTANGLE = 'RECT', REGULAR_POLYGON = 'NGON', POLYLINE_COMPLEX_POLYGON = 'POLYGON', }"
	],
	"TPCB_PrimitivePadShape": [
		"type TPCB_PrimitivePadShape = [EPCB_PrimitivePadShapeType.ELLIPSE | EPCB_PrimitivePadShapeType.OBLONG | EPCB_PrimitivePadShapeType.REGULAR_POLYGON, number, number] | [EPCB_PrimitivePadShapeType.RECTANGLE, number, number, number] | [EPCB_PrimitivePadShapeType.POLYLINE_COMPLEX_POLYGON, TPCB_PolygonSourceArray | Array<TPCB_PolygonSourceArray>];"
	],
	"EPCB_PrimitivePadHoleType": [
		"enum EPCB_PrimitivePadHoleType { ROUND = 'ROUND', RECTANGLE = 'RECT', SLOT = 'SLOT', }"
	],
	"TPCB_PrimitivePadHole": [
		"type TPCB_PrimitivePadHole = [EPCB_PrimitivePadHoleType.ROUND, number] | [EPCB_PrimitivePadHoleType.SLOT, number, number];"
	],
	"EPCB_PrimitivePadType": [
		"enum EPCB_PrimitivePadType { NORMAL = 0, TEST = 1, MARK_POINT = 2, }"
	],
	"TPCB_PrimitiveSpecialPadShape": [
		"type TPCB_PrimitiveSpecialPadShape = Array<[number, number, TPCB_PrimitivePadShape]>;"
	],
	"EPCB_PrimitivePadHeatWeldingConnectionMethod": [
		"enum EPCB_PrimitivePadHeatWeldingConnectionMethod { DIVERGENT = 'Divergent', DIRECT_CONNECTED = 'Direct-connected', NON_CONNECTED = 'Non-connected', }"
	],
	"IPCB_PrimitivePadHeatWelding": [
		"interface IPCB_PrimitivePadHeatWelding { /** 连接方式 */ connectionMethod: EPCB_PrimitivePadHeatWeldingConnectionMethod; /** 发散间距 */ divergenceSpacing?: number; /** 发散线宽 */ divergenceLineWidth?: number; /** 发散角度 */ divergenceAngle?: number; }"
	],
	"TPCB_LayersOfFill": [
		"type TPCB_LayersOfFill = TPCB_LayersOfCopper | TPCB_LayersOfCustom | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.TOP_SOLDER_MASK | EPCB_LayerId.TOP_PASTE_MASK | EPCB_LayerId.TOP_ASSEMBLY | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.BOTTOM_SOLDER_MASK | EPCB_LayerId.BOTTOM_PASTE_MASK | EPCB_LayerId.BOTTOM_ASSEMBLY | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL | EPCB_LayerId.MULTI;"
	],
	"EPCB_PrimitiveFillMode": [
		"enum EPCB_PrimitiveFillMode { SOLID = 0, MESH = 1, INNER_ELECTRICAL_LAYER = 2, }"
	],
	"EPCB_PrimitivePourFillMethod": [
		"enum EPCB_PrimitivePourFillMethod { GRID45 = '45grid', GRID = '90grid', SOLID = 'solid', }"
	],
	"IPCB_PrimitivePouredPourFill": [
		"interface IPCB_PrimitivePouredPourFill { /** 复杂多边形 */ path: IPCB_ComplexPolygon; /** 线宽 */ lineWidth: number; /** 是否填充 */ fill: boolean; /** ID */ id: string; }"
	],
	"TPCB_LayersOfRegion": [
		"type TPCB_LayersOfRegion = TPCB_LayersOfCopper | EPCB_LayerId.MULTI;"
	],
	"EPCB_PrimitiveRegionRuleType": [
		"enum EPCB_PrimitiveRegionRuleType { NO_COMPONENTS = 2, NO_WIRES = 5, NO_FILLS = 6, NO_POURS = 7, NO_INNER_ELECTRICAL_LAYERS = 8, FOLLOW_REGION_RULE = 9, }"
	],
	"EPCB_PrimitiveDimensionType": [
		"enum EPCB_PrimitiveDimensionType { RADIUS = 'Radius Dimension', LENGTH = 'Length Dimension', ANGLE = 'Protractor Dimension', }"
	],
	"TPCB_PrimitiveDimensionCoordinateSet": [
		"type TPCB_PrimitiveDimensionCoordinateSet = [number, number, number, number, number, number] | [number, number, number, number, number, number, number, number];"
	],
	"TPCB_LayersOfDimension": [
		"type TPCB_LayersOfDimension = TPCB_LayersOfCustom | EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.DOCUMENT | EPCB_LayerId.MECHANICAL;"
	],
	"TPCB_LayersOfObject": [
		"type TPCB_LayersOfObject = EPCB_LayerId.TOP_SILKSCREEN | EPCB_LayerId.BOTTOM_SILKSCREEN | EPCB_LayerId.DOCUMENT;"
	],
	"ESCH_PrimitiveType": [
		"enum ESCH_PrimitiveType { ARC = 'Arc', BUS = 'Bus', CIRCLE = 'Circle', COMPONENT = 'Component', COMPONENT_PIN = 'ComponentPin', PIN = 'Pin', POLYGON = 'Polygon', RECTANGLE = 'Rectangle', TEXT = 'Text', WIRE = 'Wire', OBJECT = 'Object', BEZIER = 'Bezier', ELLIPSE = 'Ellipse', ATTRIBUTE = 'Attribute', }"
	],
	"ISCH_Primitive": [
		"interface ISCH_Primitive { getState_PrimitiveType: () => ESCH_PrimitiveType; getState_PrimitiveId: () => string; create: () => ISCH_Primitive | Promise<ISCH_Primitive>; toAsync: () => ISCH_Primitive; toSync: () => ISCH_Primitive; isAsync: () => boolean; reset: () => ISCH_Primitive | Promise<ISCH_Primitive>; done: () => ISCH_Primitive | Promise<ISCH_Primitive>; }"
	],
	"ISCH_DrcErrorPrimitive": [
		"interface ISCH_DrcErrorPrimitive { /** 图元名字（引脚号 / 网络名 / 器件名，依规则而定） */ name?: string; /** 位号，如 `R1` */ designator?: string; /** 图元 ID（可用于画布跳转定位） */ primitiveId: string; /** 所在图页 ID */ sheet?: string; }"
	],
	"ISCH_DrcError": [
		"interface ISCH_DrcError { /** 错误级别 */ type: 'fatalError' | 'error' | 'warn'; /** 触发规则 key，如 `IN-IN`、`OUT-OUT` */ rule: string; /** 涉及的图元 */ primitives: Array<ISCH_DrcErrorPrimitive>; /** 涉及网络（若有） */ net?: string; }"
	],
	"ESCH_MouseEventType": [
		"enum ESCH_MouseEventType { SELECTED = 'selected', CLEAR_SELECTED = 'clearSelected', }"
	],
	"ESCH_PrimitiveEventType": [
		"enum ESCH_PrimitiveEventType { DELETE = 'delete', CREATE = 'create', MOVE = 'move', CHANGE = 'change', }"
	],
	"ESCH_DynamicSimulationEnginePullEventType": [
		"enum ESCH_DynamicSimulationEnginePullEventType { SESSION_START = 'SESSION_START', SESSION_PAUSE = 'SESSION_PAUSE', SESSION_RESUME = 'SESSION_RESUME', SESSION_STOP = 'SESSION_STOP', SESSION_STATE_QUERY = 'SESSION_STATE_QUERY', SPEED_SET = 'SPEED_SET', COMPONENT_UPDATE = 'COMPONENT_UPDATE', }"
	],
	"ESCH_SpiceSimulationEnginePullEventType": [
		"enum ESCH_SpiceSimulationEnginePullEventType { SIMULATE_NETLIST = 'SIMULATE_NETLIST', VALIDATE_NETLIST = 'VALIDATE_NETLIST', }"
	],
	"ESCH_SimulationNetlistType": [
		"enum ESCH_SimulationNetlistType { NGSPICE = 'Ngspice', }"
	],
	"ESCH_ExportDocumentFileType": [
		"enum ESCH_ExportDocumentFileType { PDF = 'PDF', PNG = 'PNG', SVG = 'SVG', }"
	],
	"ISCH_WireInfo": [
		"interface ISCH_WireInfo { /** 导线名称 */ name: string; /** ID */ id: string; /** 全局网络名 */ globalNetName: string; /** 原理图图页名称 */ pageName: string; /** 原理图图页 UUID */ pageUuid: string; }"
	],
	"ISCH_NetInfo": [
		"interface ISCH_NetInfo { /** 网络名称 */ net: string; /** 导线 */ wires: Array<ISCH_WireInfo>; }"
	],
	"ISCH_ProjectNetInfo": [
		"interface ISCH_ProjectNetInfo { /** 原理图名称 */ schematicName: string; /** 原理图 UUID */ schematicUuid: string; /** 板子名称 */ boardName: string; /** 网络 */ nets: Array<ISCH_NetInfo>; }"
	],
	"IRawSchematic": [
		"interface IRawSchematic { title: string; displayTitle: string; board: string; }"
	],
	"IRawWire": [
		"interface IRawWire { wirePath: string; net: string; netName: string[]; nlNet: string; path: string; }"
	],
	"IRawNet": [
		"interface IRawNet { nlNet: string; designatorPinName: string | null; wires: Array<IRawWire>; }"
	],
	"IRawPureSchematic": [
		"interface IRawPureSchematic { sheets: { [key: string]: { uuid: string; title: string; displayTitle: string; zIndex: number } }; nlNetWires: Array<IRawNet>; }"
	],
	"ISCH_PrimitiveAPI": [
		"interface ISCH_PrimitiveAPI { create: (...args: any[]) => ISCH_Primitive | undefined | Promise<ISCH_Primitive> | Promise<ISCH_Primitive | undefined>; delete: (primitiveIds: string | any | Array<string> | Array<any>) => boolean | Promise<boolean>; modify: (primitiveId: string | any, ...args: any[]) => ISCH_Primitive | undefined | Promise<ISCH_Primitive> | Promise<ISCH_Primitive | undefined>; get: ((primitiveIds: string) => ISCH_Primitive | undefined | Promise<ISCH_Primitive | undefined>) & ((primitiveIds: string[]) => Array<ISCH_Primitive> | Promise<Array<ISCH_Primitive>>); getAllPrimitiveId: (...args: any[]) => Array<string> | Promise<Array<string>>; getAll: (...args: any[]) => Array<ISCH_Primitive> | Promise<Array<ISCH_Primitive>>; }"
	],
	"ESCH_PrimitiveLineType": [
		"enum ESCH_PrimitiveLineType { SOLID = 0, DASHED = 1, DOTTED = 2, DOT_DASHED = 3, }"
	],
	"ESCH_PrimitiveTextAlignMode": [
		"enum ESCH_PrimitiveTextAlignMode { LEFT_TOP = 1, LEFT_MIDDLE = 2, LEFT_BOTTOM = 3, CENTER_TOP = 4, CENTER = 5, CENTER_BOTTOM = 6, RIGHT_TOP = 7, RIGHT_MIDDLE = 8, RIGHT_BOTTOM = 9, }"
	],
	"ESCH_PrimitiveFillStyle": [
		"enum ESCH_PrimitiveFillStyle { NONE = 'None', SOLID = 'Solid', GRID = 'Grid', HORIZONTAL_LINE = 'Horizontal Line', VERTICAL_LINE = 'Vertical Line', RHOMBIC_GRID = 'Rhombic Grid', LEFT_SLASH_LINE = 'Left Slash Line', RIGHT_SLASH_LINE = 'Right Slash Line', }"
	],
	"ESCH_PrimitiveComponentType": [
		"enum ESCH_PrimitiveComponentType { COMPONENT = 'part', DRAWING = 'sheet', NET_FLAG = 'netflag', NET_PORT = 'netport', NON_ELECTRICAL_FLAG = 'nonElectrical_symbol', SHORT_CIRCUIT_FLAG = 'short_symbol', OFF_PAGE_CONNECTOR = 'offPageConnector', DIFFERENTIAL_PAIRS_FLAG = 'diffPairsFlag', CBB_SYMBOL = 'block_symbol', }"
	],
	"ESCH_PrimitivePinShape": [
		"enum ESCH_PrimitivePinShape { NONE = 'None', INVERTED = 'Inverted', CLOCK = 'Clock', INVERTED_CLOCK = 'Inverted Clock', }"
	],
	"ESCH_PrimitivePinType": [
		"enum ESCH_PrimitivePinType { IN = 'IN', OUT = 'OUT', BI = 'BI', PASSIVE = 'Passive', OPEN_COLLECTOR = 'Open Collector', OPEN_EMITTER = 'Open Emitter', POWER = 'Power', GROUND = 'Ground', HIZ = 'HIZ', TERMINATOR = 'Terminator', UNDEFINED = 'Undefined', }"
	],
	"NetportDeviceName": [
		"enum NetportDeviceName { IN = 'Netport-IN', OUT = 'Netport-OUT', BI = 'Netport-BI', Power = 'Netport-Power', OpenEmitter = 'Netport-Open-Emitter', OpenCollector = 'Netport-Open-Collector', Passive = 'Netport-Passive', HIZ = 'Netport-HIZ', Terminator = 'Netport-Terminator', Ground = 'Netport-Ground', Undefined = 'Netport-Undefined', }"
	],
	"SchToolBarDeviceName": [
		"enum SchToolBarDeviceName { VCC = 'Power-VCC', V5 = 'Power-5V', GND = 'Ground-GND', PGND = 'Ground-PGND', AGND = 'Ground-AGND', IN = 'Netport-IN', OUT = 'Netport-OUT', BI = 'Netport-BI', OFF_PAGE_CONNECTOR_IN = 'Off-Page-Connector-In', OFF_PAGE_CONNECTOR_OUT = 'Off-Page-Connector-Out', OFF_PAGE_CONNECTOR_BI = 'Off-Page-Connector-BI', DIFF_PAIRS_FLAG = 'Differential-Pairs-Flag', SHORT = 'Short-Symbol', RESISTOR = 'Res_0603', CAPACITOR = 'CAP_0603', INDUCTOR = 'L_0603', DIODE = '1N4007', TEST_POINT = 'Test-Point', PROBE_I = '电流探针', PROBE_V = '电压探针', PROBE_L = '逻辑探针', FOUR_CHANNEL_OSCILLOSCOPE = '四通道示波器', MULTIMETER = '万用表', }"
	],
	"ESCH_DynamicSimulationEnginePushEventType": [
		"enum ESCH_DynamicSimulationEnginePushEventType { SESSION_STATE = 'SESSION_STATE', STREAM_DATA = 'STREAM_DATA', STREAM_SNAPSHOT = 'STREAM_SNAPSHOT', ENGINE_LOG = 'ENGINE_LOG', ENGINE_ERROR = 'ENGINE_ERROR', }"
	],
	"ESCH_SpiceSimulationEnginePushEventType": [
		"enum ESCH_SpiceSimulationEnginePushEventType { SIMULATION_RESULT = 'SIMULATION_RESULT', VALIDATION_RESULT = 'VALIDATION_RESULT', LOG_RESULT = 'LOG_RESULT', ERROR_RESULT = 'ERROR_RESULT', }"
	],
	"IconProps": [
		"interface IconProps { /** 图标图片地址 */ iconUrl?: string; /** 图标 CSS class 名 */ iconClass?: string; }"
	],
	"ButtonProps": [
		"interface ButtonProps { /** 按钮显示文本 */ text?: string; /** 是否禁用 */ disabled?: boolean; /** 按钮样式类型：default 默认 / primary 主按钮 / danger 危险 / forbidden 禁用态 / text 纯文本 */ type?: 'default' | 'primary' | 'danger' | 'forbidden' | 'text'; /** 按钮图标配置 */ icon?: IconProps; /** 点击按钮时触发 */ onClick?: () => void; }"
	],
	"ListChildren": [
		"interface ListChildren { /** 列表项标题（必填） */ title: string; /** 列表项唯一标识 */ id?: string; /** 列表项关联值 */ value?: string; /** 是否显示清除按钮 */ clearBtn?: boolean; /** 子列表项，用于多级嵌套 */ children?: ListChildren[]; /** 是否选中 */ selected?: boolean; /** 列表项图标列表 */ icons?: IconProps[]; }"
	],
	"InputProps": [
		"interface InputProps { /** 是否禁用输入 */ disabled?: boolean; /** 是否只读 */ readonly?: boolean; /** 是否显示清除按钮 */ clearBtn?: boolean; /** 是否显示点击按钮 */ clickBtn?: boolean; /** 下拉列表数据，提供时输入框可下拉选择 */ dropDownList?: ListChildren[]; /** 是否显示搜索按钮 */ searchBtn?: boolean; /** 当前输入值 */ value?: string; /** 占位提示文本 */ placeholder?: string; /** 前缀文本 */ preText?: string; /** 输入框类型（必填） */ type: 'text' | 'telephone' | 'number' | 'password' | 'color' | 'email'; /** 附加到 input 元素的其他属性（键值对字符串） */ otherAttr?: { [key: string]: string }; /** 测试用校验值 */ testVal?: string; /** 点击输入框时触发 */ onClick?: () => void; /** 点击搜索按钮时触发，参数为当前输入值 */ onSearchClick?: (data: string) => void; /** 点击筛选按钮时触发，参数为当前输入值 */ onFilterClick?: (data: string) => void; /** 输入内容变化时触发，参数为最新值 */ onChange?: (data: string) => void; /** 点击添加按钮时触发，参数为当前输入值 */ onAddClick?: (data: string) => void; /** 输入框失焦时触发，参数为当前输入值 */ onBlur?: (data: string) => void; }"
	],
	"TextProps": [
		"interface TextProps { /** 文本内容（必填） */ value: string; /** 字体族 */ fontFamily?: string; /** 水平对齐方式 */ textAlign?: 'left' | 'center' | 'right'; /** 字号（像素） */ fontSize?: number; /** 文本颜色 */ color?: string; }"
	],
	"StyleProps": [
		"interface StyleProps { /** 背景颜色，接受任意 CSS 颜色值 */ backgroundColor?: string; /** 边框宽度（像素），>0 时生效 */ borderWidth?: number; /** 边框颜色，仅在 borderWidth > 0 时生效 */ borderColor?: string; /** 是否隐藏（display: none），优先于 invisible */ hide?: boolean; /** 文本颜色，接受任意 CSS 颜色值 */ color?: string; /** 内边距（CSS 简写），如 [上,右,下,左] 或 [上下,左右] 或 [全部] */ padding?: number[]; /** 外边距（CSS 简写），如 [上,右,下,左] 或 [上下,左右] 或 [全部] */ margin?: number[]; /** 宽度（像素）或 '100%' */ width?: number | '100%'; /** 高度（像素）或 '100%' */ height?: number | '100%'; /** 旋转角度（度） */ rotate?: number; /** 鼠标悬停时的光标样式 */ cursor?: 'pointer' | 'default' | 'none' | 'move' | 'text'; /** 是否仅隐藏视觉（visibility: hidden），仍占位 */ invisible?: boolean; /** 覆盖 display 样式 */ display?: string; }"
	],
	"FlexProps": [
		"interface FlexProps extends StyleProps { /** 子节点 */ children?: any; /** 主轴方向：row 水平 / column 垂直（含反向） */ direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse'; /** 主轴对齐方式（水平） */ alignX?: 'start' | 'center' | 'end'; /** 交叉轴对齐方式（垂直） */ alignY?: 'start' | 'center' | 'end' | 'stretch'; /** 子元素间距（像素） */ gap?: number; /** 附加的样式 class 名列表 */ classes?: string[]; /** 点击容器时触发 */ onClick?: () => void; }"
	],
	"FlexItemProps": [
		"interface FlexItemProps extends StyleProps { /** 子节点 */ children?: any; /** 弹性占比（flex 生长因子） */ flexRatio?: number; /** 点击子项时触发 */ onClick?: () => void; }"
	],
	"GridProps": [
		"interface GridProps extends StyleProps { /** 子节点 */ children?: any; /** 列数（必填） */ columns: number; /** 行间距（像素） */ rowGap?: number; /** 列间距（像素） */ colGap?: number; }"
	],
	"GridItemProps": [
		"interface GridItemProps extends StyleProps { /** 子节点 */ children?: any; /** 跨列数 */ colSpan?: number; /** 跨行数 */ rowSpan?: number; /** 单元格内对齐方式 */ align?: 'start' | 'center' | 'end' | 'stretch'; }"
	],
	"ListProps": [
		"interface ListProps { /** 列表数据（必填） */ list: ListChildren[]; /** 列表项高度（像素） */ itemHeight?: number; /** 是否显示边框 */ border?: boolean; /** 是否允许展开嵌套子项 */ expandEnable?: boolean; /** 点击列表项时触发，参数为 id 与列表项 */ onItemClick?: (id: string, item: ListChildren) => void; /** 双击列表项时触发，参数为 id */ onItemDblclick?: (id: string) => void; /** 右键点击列表项时触发，参数为 id */ onItemContextmenu?: (id: string) => void; }"
	],
	"CheckBoxProps": [
		"interface CheckBoxProps { /** 是否选中 */ checked?: boolean; /** 是否禁用 */ disabled?: boolean; /** 复选框旁显示文本 */ text?: string; /** 复选框名称（表单 name 属性） */ name?: string; /** 是否仅通过点击勾选框本身来改变状态 */ onlyChangeByBox?: boolean; /** 选中状态变化时触发，参数为最新选中值 */ onChange?: (checked: boolean) => void; }"
	],
	"RadioItem": [
		"interface RadioItem { /** 是否禁用该选项 */ disabled?: boolean; /** 选项显示文本（必填） */ text: string; /** 选项值（必填） */ value: string; }"
	],
	"RadioGroupProps": [
		"interface RadioGroupProps { /** 选项列表（必填） */ group: RadioItem[]; /** 当前选中的值 */ selectedValue?: string; /** 是否仅通过点击单选框本身来改变状态 */ onlyChangeByBox?: boolean; /** 是否换行排列 */ lineBreak?: boolean; /** 选项间距（像素） */ gap?: number; /** 选中值变化时触发，参数为选中项的值 */ onChange?: (value: string) => void; }"
	],
	"TextAreaProps": [
		"interface TextAreaProps { /** 是否禁用输入 */ disabled?: boolean; /** 当前文本值 */ value?: string; /** 是否可调整尺寸（x 水平 / y 垂直） */ resizable?: { x?: undefined | false | true; y?: undefined | false | true }; /** 占位提示文本 */ placeholder?: string; /** 输入框名称（表单 name 属性） */ name?: string; /** 文本变化时触发，参数为最新值 */ onChange?: (value: string) => void; }"
	],
	"ModalProps": [
		"interface ModalProps { /** 弹窗内容子节点 */ children?: any; /** 距顶部位置（像素，必填） */ top: number; /** 距左侧位置（像素，必填） */ left: number; /** 宽度（像素，必填） */ width: number; /** 高度（像素，必填） */ height: number; /** 是否显示遮罩层 */ overlay?: boolean; /** 最大水平拖拽距离（像素） */ maxDragX?: number; /** 最大垂直拖拽距离（像素） */ maxDragY?: number; /** 是否隐藏弹窗 */ hide?: boolean; /** 是否允许水平调整大小 */ resizeX?: boolean; /** 是否允许垂直调整大小 */ resizeY?: boolean; /** 弹窗移动时触发，参数为新位置 */ onMoved?: (top: number, left: number) => void; }"
	],
	"DialogProps": [
		"interface DialogProps { /** 对话框内容子节点 */ children?: any; /** 标题文本（必填） */ title: string; /** 宽度（像素） */ width?: number; /** 高度（像素） */ height?: number; /** 距左侧位置（像素） */ left?: number; /** 距顶部位置（像素） */ top?: number; /** 是否隐藏对话框 */ hide?: boolean; /** 是否显示遮罩层 */ overlay?: boolean; /** 最大垂直拖拽距离（像素） */ maxDragY?: number; /** 是否以模态方式显示 */ modal?: boolean; /** 是否允许水平调整大小 */ resizeX?: boolean; /** 是否允许垂直调整大小 */ resizeY?: boolean; /** 关闭对话框时触发 */ onClose?: () => void; }"
	],
	"SlotProps": [
		"interface SlotProps { /** 插槽内容子节点 */ children?: any; /** 插槽名称（必填） */ name: string; }"
	],
	"SelectListItem": [
		"interface SelectListItem { /** 选项标题（必填） */ title: string; /** 选项关联值 */ value?: string; /** 是否选中 */ selected?: boolean; /** 子选项，用于多级嵌套 */ children?: SelectListItem[]; }"
	],
	"SelectProps": [
		"interface SelectProps { /** 是否禁用 */ disabled?: boolean; /** 是否只读 */ readonly?: boolean; /** 下拉选项列表 */ dropDownList?: SelectListItem[]; /** 当前选中值 */ value?: string; /** 选中值变化时触发，参数为选中项的值 */ onChange?: (value: string) => void; }"
	],
	"BoardProps": [
		"interface BoardProps { /** 面板内容子节点 */ children?: any; /** 内边距（CSS 简写数组） */ padding?: number[]; /** 背景颜色，接受任意 CSS 颜色值 */ bgColor?: string; /** 标题文本（必填） */ title: string; /** 点击面板时触发 */ onClick?: () => void; }"
	],
	"ImageProps": [
		"interface ImageProps { /** 图片地址（必填） */ src: string; /** 图片标题（alt/text） */ title?: string; /** 点击图片时触发 */ onClick?: () => void; }"
	],
	"ScrollerProps": [
		"interface ScrollerProps { /** 子节点 */ children?: any; /** 总行数（必填） */ itemCount: number; /** 每行高度（像素，必填） */ itemHeight: number; /** 额外缓冲渲染的行数 */ buffer?: number; /** 可见行变化时触发，参数为可见行索引与对应插槽名列表 */ onVisibleRowsChange?: (visibleRows: { index: number; slotName: string }[]) => void; }"
	],
	"ComponentPropsMap": [
		"interface ComponentPropsMap { Button: ButtonProps; Input: InputProps; Text: TextProps; Flex: FlexProps; FlexItem: FlexItemProps; Grid: GridProps; GridItem: GridItemProps; List: ListProps; CheckBox: CheckBoxProps; RadioGroup: RadioGroupProps; TextArea: TextAreaProps; Modal: ModalProps; Dialog: DialogProps; Slot: SlotProps; Select: SelectProps; Board: BoardProps; Image: ImageProps; Scroller: ScrollerProps; }"
	],
	"IDesignPortal": [
		"interface IDesignPortal<T extends keyof ComponentPropsMap = keyof ComponentPropsMap> { createComponent(handle: string, type: T, props: ComponentPropsMap[T], eventDispatcher: (ev: any) => void, parent?: string): void; updateComponent(handle: string, type: T, props: ComponentPropsMap[T], eventDispatcher: (ev: any) => void): void; detachComponent(handle: string): void; }"
	],
	"ESYS_ImportProjectImportOption": [
		"enum ESYS_ImportProjectImportOption { IMPORT_DOCUMENT = 'ImportDocument', EXTRACT_LIBRARIES = 'ExtractLibraries', IMPORT_DOCUMENT_EXTRACT_LIBRARIES = 'ImportDocumentExtractLibraries', }"
	],
	"ESYS_ImportProjectSchematicObjectStyle": [
		"enum ESYS_ImportProjectSchematicObjectStyle { USE_SYSTEM_THEME = 'system', USE_SOURCE_FILE_STYLE = 'custom', }"
	],
	"ESYS_ImportProjectViaSolderMaskExpansion": [
		"enum ESYS_ImportProjectViaSolderMaskExpansion { ALL_COVER_OIL = 'cover', FOLLOW_ORIGINAL_SETTING = 'custom', }"
	],
	"ESYS_ImportProjectBoardOutlineSource": [
		"enum ESYS_ImportProjectBoardOutlineSource { FROM_KEEPOUT_LAYER = 'keepout', FROM_MECHANICAL_LAYER_1 = 'mechanical', }"
	],
	"ISYS_FileSystemFileList": [
		"interface ISYS_FileSystemFileList { /** 文件名（前后均无斜杠） */ fileName: string; /** 是否为目录 */ isDirectory: boolean; /** 目录子文件 */ subFiles?: Array<ISYS_FileSystemFileList>; /** 相对路径，不包含前面的传入路径和文件名（当没有传入路径时，不存在相对路径），且前后均无斜杠 */ relativePath?: string; /** 完整路径，包含文件名的绝对路径 */ fullPath: string; }"
	],
	"ISYS_HeaderMenuSub2MenuItem": [
		"interface ISYS_HeaderMenuSub2MenuItem { /** 菜单项 ID，不可重复 */ id: string; /** 菜单项标题 */ title: string; /** 菜单项图标 */ icon?: string; /** 注册方法名称（需要在扩展入口文件导出该方法） */ registerFn?: string; }"
	],
	"ISYS_HeaderMenuSub1MenuItem": [
		"interface ISYS_HeaderMenuSub1MenuItem { /** 菜单项 ID，不可重复 */ id: string; /** 菜单项标题 */ title: string; /** 菜单项图标 */ icon?: string; /** 注册方法名称（需要在扩展入口文件导出该方法） */ registerFn?: string; /** 子菜单项 */ menuItems?: Array<ISYS_HeaderMenuSub2MenuItem | null>; }"
	],
	"ISYS_HeaderMenuTopMenuItem": [
		"interface ISYS_HeaderMenuTopMenuItem { /** 菜单项 ID，不可重复 */ id: string; /** 菜单项标题 */ title: string; /** 子菜单项 */ menuItems?: Array<ISYS_HeaderMenuSub1MenuItem | null>; }"
	],
	"ISYS_HeaderMenus": [
		"interface ISYS_HeaderMenus { /** 主页 */ home?: Array<ISYS_HeaderMenuTopMenuItem>; /** 空白页 */ blank?: Array<ISYS_HeaderMenuTopMenuItem>; /** 原理图 */ schematic?: Array<ISYS_HeaderMenuTopMenuItem>; /** * 原理图 * * @deprecated 请使用 `schematic` 替代 */ sch?: Array<ISYS_HeaderMenuTopMenuItem>; /** 符号（包括 CBB 符号） */ symbol?: Array<ISYS_HeaderMenuTopMenuItem>; /** PCB */ pcb?: Array<ISYS_HeaderMenuTopMenuItem>; /** 封装 */ footprint?: Array<ISYS_HeaderMenuTopMenuItem>; /** PCB 预览（包括 2D、3D 预览） */ pcbView?: Array<ISYS_HeaderMenuTopMenuItem>; /** 面板 */ panel?: Array<ISYS_HeaderMenuTopMenuItem>; /** 面板库 */ panelLibrary?: Array<ISYS_HeaderMenuTopMenuItem>; /** 面板预览 */ panelView?: Array<ISYS_HeaderMenuTopMenuItem>; /** 仿真原理图：Ngspice */ simulationSchematicNgspice?: Array<ISYS_HeaderMenuTopMenuItem>; /** * 仿真原理图：Ngspice * * @deprecated 请使用 `simulationSchematicNgspice` 替代 */ simulationSchematicNGspice?: Array<ISYS_HeaderMenuTopMenuItem>; /** 仿真原理图：SimulIDE */ simulationSchematicSimulIDE?: Array<ISYS_HeaderMenuTopMenuItem>; }"
	],
	"ESYS_HeaderMenuEnvironment": [
		"enum ESYS_HeaderMenuEnvironment { HOME = 'home', BLANK = 'blank', SCHEMATIC = 'sch', SYMBOL = 'symbol', PCB = 'pcb', FOOTPRINT = 'footprint', PCB_VIEW = 'pcbView', PANEL = 'panel', PANEL_LIBRARY = 'panelLibrary', PANEL_VIEW = 'panelView', SIMULATION_SCHEMATIC_NGSPICE = 'simulationSchematicNgspice', SIMULATION_SCHEMATIC_SIMULIDE = 'simulationSchematicSimulIDE', }"
	],
	"ISYS_LanguageKeyValuePairs": [
		"type ISYS_LanguageKeyValuePairs = Record<string, string>;"
	],
	"ISYS_MultilingualLanguagesData": [
		"interface ISYS_MultilingualLanguagesData { [language: string]: ISYS_LanguageKeyValuePairs; }"
	],
	"ESYS_LogType": [
		"enum ESYS_LogType { INFO = 'info', WARNING = 'warn', ERROR = 'error', FATAL_ERROR = 'fatalError', FIND = 'find', REPLACE = 'replace', OPEN_PROJECT = 'openProject', }"
	],
	"ISYS_LogLine": [
		"interface ISYS_LogLine { /** 时间戳 */ timestamp: number; /** 日志类型 */ type: ESYS_LogType; /** 日志内容 */ message: string; }"
	],
	"ISYS_MathPoint": [
		"interface ISYS_MathPoint { /** X 坐标 */ x: number; /** Y 坐标 */ y: number; }"
	],
	"ISYS_MathPolygonWithHoles": [
		"interface ISYS_MathPolygonWithHoles { /** 外环 */ outer: Array<ISYS_MathPoint>; /** 孔洞（内环）数组 */ holes: Array<Array<ISYS_MathPoint>>; }"
	],
	"TSYS_MathPolygonGroup": [
		"type TSYS_MathPolygonGroup = Array<ISYS_MathPolygonWithHoles>;"
	],
	"TSYS_MathPolygonInput": [
		"type TSYS_MathPolygonInput = Array<ISYS_MathPoint> | TPCB_PolygonSourceArray | IPCB_Polygon | IPCB_ComplexPolygon | TSYS_MathPolygonGroup;"
	],
	"ISYS_MathBBox": [
		"interface ISYS_MathBBox { /** 最小 X 坐标 */ minX: number; /** 最小 Y 坐标 */ minY: number; /** 最大 X 坐标 */ maxX: number; /** 最大 Y 坐标 */ maxY: number; }"
	],
	"ESYS_ToastMessageType": [
		"enum ESYS_ToastMessageType { ERROR = 'error', WARNING = 'warn', INFO = 'info', SUCCESS = 'success', ASK = 'question', }"
	],
	"ESYS_BottomPanelTab": [
		"enum ESYS_BottomPanelTab { LIBRARY = 'library', LOG = 'log', PCB_DRC = 'drcResult', SCHEMATIC_DRC = 'schDrcResult', FIND = 'findResult', }"
	],
	"ISYS_MessageBusTask": [
		"interface ISYS_MessageBusTask { /** 调用以取消任务 */ cancel: () => void; /** * 检查运行状态 * * @returns 是否正在监听 */ running: () => boolean; /** * 任务处理 * * @param message - 接收到的数据 */ execute: (message: any) => Promise<void>; }"
	],
	"ESYS_LeftPanelTab": [
		"enum ESYS_LeftPanelTab { PROJECT_LIST = 'project_list', PROJECT_DESIGN = 'projectDesign', LIB_DESIGN = 'libDesign', BASIC_LIBRARY = 'basicLibrary', DEVICE_STANDARDIZATION = 'device-standardization', }"
	],
	"ESYS_RightPanelTab": [
		"enum ESYS_RightPanelTab { SCH_ATTR = 'sch-attr', SCH_FILTER = 'sch-filter', PROJECT_ATTR = 'project-attr', PANEL_LAYER = 'panel-layer', PANEL_ATTR = 'panel-attr', PANEL_FILTER = 'panel-filter', PCB_LAYER = 'pcb-layer', PCB_ATTR = 'pcb-attr', PCB_SKETCHER_ATTR = 'pcb-sketcher-attr', PCB_FILTER = 'pcb-filter', PCB_2D_PREVIEW_ATTR = 'pcb2d-attr', PCB_3D_PREVIEW_LAYER = 'pcb3d-layer', PCB_3D_PREVIEW_ATTR = 'pcb3d-attr', PANEL_3D_PREVIEW_LAYER = 'panel3d-layer', PANEL_3D_PREVIEW_ATTR = 'panel3d-attr', ANNOTATION = 'annotation', }"
	],
	"ISYS_RightClickMenuItem": [
		"interface ISYS_RightClickMenuItem { /** 菜单项 ID，不可重复 */ id: string; /** 菜单项标题 */ title?: string; /** 菜单项图标 */ icon?: string; /** 注册方法名称（需要在扩展入口文件导出该方法） */ registerFn?: string; /** 子菜单项 */ menuItems?: Array<ISYS_RightClickMenuItem | null>; }"
	],
	"TSYS_ShortcutKeys": [
		"type TSYS_ShortcutKeys = Array<'SHIFT' | 'LEFT_SHIFT' | 'RIGHT_SHIFT' | 'FN' | 'ALT' | 'LEFT_ALT' | 'RIGHT_ALT' | 'CONTROL' | 'LEFT_CONTROL' | 'RIGHT_CONTROL' | 'COMMAND' | 'WIN' | 'OPTION' | 'SUPER' | 'TAB' | 'SPACE' | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' | 'F13' | 'F14' | 'F15' | 'F16' | 'F17' | 'F18' | 'F19' | 'F20' | '`' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '-' | '=' | 'Q' | 'W' | 'E' | 'R' | 'T' | 'Y' | 'U' | 'I' | 'O' | 'P' | '[' | ']' | 'A' | 'S' | 'D' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | ';' | '\\'' | '\\\\' | 'Z' | 'X' | 'C' | 'V' | 'B' | 'N' | 'M' | ',' | '.' | '/'>;"
	],
	"ESYS_ShortcutKeyEffectiveEditorRange": [
		"enum ESYS_ShortcutKeyEffectiveEditorRange { BLANK = 0, HOME = 1, SCHEMATIC_PAGE = 2, SYMBOL = 3, PCB = 4, FOOTPRINT = 5, PANEL = 6, PCB_3D_PREVIEW = 7, PCB_2D_PREVIEW = 8, PANEL_3D_PREVIEW = 9, PANEL_LIBRARY = 10, ASSEMBLY_VARIANT = 11, SIMULATION_SCHEMATIC_PAGE_NGSPICE = 12, SIMULATION_SCHEMATIC_PAGE_SIMULIDE = 13, SIMULATION_WAVEFORM = 14, }"
	],
	"ESYS_ShortcutKeyEffectiveEditorScene": [
		"enum ESYS_ShortcutKeyEffectiveEditorScene { EDITOR = 1, CANVAS_SELECTED = 2, CANVAS_NOT_SELECT = 3, DRAWING = 4, PLACING = 5, LOCAL = 6, }"
	],
	"ISYS_ShortcutKeyData": [
		"interface ISYS_ShortcutKeyData { /** 快捷键 */ shortcutKey: TSYS_ShortcutKeys | null; /** 标题 */ title: string; /** 备注 */ remark: string; /** 快捷键生效页面范围 */ range: Array<ESYS_ShortcutKeyEffectiveEditorRange>; /** 快捷键生效场景范围 */ scene: Array<ESYS_ShortcutKeyEffectiveEditorScene>; }"
	],
	"ISYS_ShortcutKeyDataWithCallFn": [
		"interface ISYS_ShortcutKeyDataWithCallFn extends ISYS_ShortcutKeyData { /** 快捷键方法 */ callFn: () => void | Promise<void>; }"
	],
	"ISYS_ShortcutKeyDataWithUserDefinedShortcutKey": [
		"interface ISYS_ShortcutKeyDataWithUserDefinedShortcutKey extends ISYS_ShortcutKeyData { /** 用户定义快捷键 */ userDefinedShortcutKey?: TSYS_ShortcutKeys | null; }"
	],
	"TSYS_PcbComparisonErrorCode": [
		"type TSYS_PcbComparisonErrorCode = 'INVALID_PARAM' | 'SAME_PCB' | 'PCB_NOT_FOUND' | 'COMPARISON_FAILED';"
	],
	"ISYS_PcbComparisonResponse": [
		"interface ISYS_PcbComparisonResponse { /** 是否成功 */ success: boolean; /** 对比结果（`success = true` 时存在） */ data?: any; /** 错误（`success = false` 时存在） */ error?: { code: TSYS_PcbComparisonErrorCode; message: string }; }"
	],
	"ESYS_WindowOpenTarget": [
		"enum ESYS_WindowOpenTarget { BLANK = '_blank', SELF = '_self', }"
	],
	"ESYS_WindowEventType": [
		"enum ESYS_WindowEventType { BLUR = 'blur', FOCUS = 'focus', }"
	],
	"ISYS_WindowEventListenerRemovableObject": [
		"interface ISYS_WindowEventListenerRemovableObject { type: ESYS_WindowEventType; listener: (ev: any) => any; options?: { capture?: undefined | false | true }; }"
	],
	"ESYS_Theme": [
		"enum ESYS_Theme { LIGHT = 'light', DARK = 'dark', }"
	],
	"ESYS_StartPageQuickStartItem": [
		"enum ESYS_StartPageQuickStartItem { NEW_PROJECT = 'New Project', OPEN_PROJECT = 'Open Project', NEW_LIBRARY = 'New Library', NEW_COMPONENT = 'New Component', NEW_SYMBOL = 'New Symbol', NEW_FOOTPRINT = 'New Footprint', NEW_3D_MODEL = 'New 3D Model', NEW_REUSE_BLOCK = 'New Reuse Block', MIGRATE_STANDARD = 'Migrate Standard', IMPORT_PROFESSIONAL = 'Import Professional', IMPORT_STANDARD = 'Import Standard', IMPORT_ALTIUM = 'Import Altium', IMPORT_KICAD = 'Import KiCad', IMPORT_OTHER = 'Import Other', SETTING = 'Setting', ABOUT = 'About', }"
	],
	"ELIB_DeviceJlcLibraryCategory": [
		"enum ELIB_DeviceJlcLibraryCategory { STANDARD = 'standard', EXTEND = 'extend', }"
	]
} as const;
