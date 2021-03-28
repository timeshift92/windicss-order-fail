<script lang="ts">
	import CrudExample from "@src/pages/admin/categories/index.svelte";

</script>

<nu-flow padding="0 2 0 2" gap="4">
	<nu-markdown>
		<pre
		>
		# Начало
		Данный **CMS** разрабатывает для облегчение последующих разработок для команд, совмещая все наработки и давая возможность их использовать повсеместно.

		## Структура

		 ```

		 src
			├── components
			├── core
				   ├── configs.ts
				   └── svqlConfig.ts
			├── node_modules
			└── pages

		 ```
		</pre>
	</nu-markdown>

	<nu-tablist value="docs" border="bottom">
		<nu-tab control="docs" value="docs" trigger>
			Описание
		  </nu-tab>
		<nu-tab control="example" value="example" trigger>
		  Пример
		</nu-tab>
		<nu-tab control="source" value="source" trigger>
		  Исходник
		</nu-tab>
	  </nu-tablist>
	  <nu-block>
		<nu-block id="docs" effect="docs">
			<nu-markdown>
				<pre>
					## CRUD

					копонент позволяет создавать crud таблицу
					## Описание Полей
					### queryName
					Данное поле является названием сущности на основе которого происходит запрос
					как Пример
					```
					 fetch('posts')
					```
					### columns
				```
				{`
				[{
					/*
					название колонки в бд(table_name) или отношение(relation),
					например таблица users иммеет отношением с profiles
					тогда name:'profiles'
					*/
						name: string
						title: string // описание
						/*
						  опциональное поле, используется когда колонка является отношением (relation)
						 */
						fields: Array<string>
							/*
							опциональное поле, для внешних компонентов
							*/
						component?: Object
						/** example:
							 *  is_desc => ({
								id: is_desc ? 'desc' : 'asc',
							})
							*/
						sort?: Function|any
						/**
						 * example: model => model.id
						 */
						value?: string | Function
						filter?: {
							/**
								 *   value => ({
									product_locales: {
										name: { _ilike: \`%\${value}%\` },
									},
								}),
								*/
							query?: Function
							placeholder?: string
					}
				}]
				`

				}
				```
				## formBuilder

				```{`
				   buttonTitle?: string
				   /*
				   Хук выполняемая перед отправки данных
				   возвращает строку (row)
				   */
				   prePost: Function,
				   options?: string,
				   fields: Array<TField>`}
			   ```
					### fields
					```
					{`
					type: 'editor' | 'dropdown' | 'dropdown multiple' | 'number' | 'text' | 'textarea' | 'select' | 'textarea' | 'radio' | 'checkbox' | 'hidden' | 'date'

					name: string //название поле
					path?: string //название массива полей для отношении
					label: string // лейбл
					options?: any //опции numl
					fields?: Array<string> // поля
					data?: { queryName: string, key: string, value: string } // data нужен в основном для селектов или для компонентов где через запрос надо получить данные
					/*
					interface ValidationObject {
						[key: string]: string
					}
					interface ValidationFunction {
						assert(value): boolean,
						reason: string
					}
					также есть строчные валидации
					required | maxlength:10 | minlength:15 | email

					*/
					validations?: Validation

					`}
					```
				</pre>
			</nu-markdown>
		  </nu-block>
		<nu-block id="example" effect="collapse">
		  <CrudExample/>
		</nu-block>
		<nu-block id="source" effect="collapse">
			<nu-markdown>
				<pre
				>

				## Компонент -- CRUD

				 ```

				{
					`<script lang="ts">



				import type { Data } from '@/features/crud/interfaces';
				import MyComponent from './_MyComponent.svelte'
				import Crud from '@/features/crud/Index.svelte';

			const data: Data = {
				queryName: 'categories',
				create: true,
				actions: {
					title: 'Действия',
					update: true,
					delete: true,
				},
				columns: [
					{
						name: 'category_locales',
						fields: ['name'],

						value: (row) => row.category_locales[0]?.name,
						title: 'Название',
					},
					{
						name: 'category',
						fields: ['category_locales { name }'],
						value: (row) => row.category?.category_locales[0]?.name || '',
						title: 'Родитель',
					},
				],
				formBuilder: {
					buttonTitle: 'Отправить',
					prePost: (data) => {
						const transformed = parseNuFormRec(data)
						transformed.addins = transformed.addins
						return transformed
					},
					fields: [
						{
							type: 'tabs',
							name: 'category_locales',
							options: {
								column: 'span 1',
								flow: 'column',
								gap: '5px',
							},
							args: [
								{ name: 'code', value: 'ru', title: 'Ru' },
								{ name: 'code', value: 'en', title: 'En' },
							],
							fields: [
								{
									type: 'text',
									name: 'description',
									label: 'Описание',
								},
								{
									type: 'text',
									name: 'name',
									label: 'Название',
								},
							],
						},

						{
							type: 'component',
							name: 'addins',
							label: 'Контент',
							component: MyComponent,
						},
					],
				},
			}
		</script>`
				}


				 ```


				</pre>
			</nu-markdown>
		</nu-block>

	  </nu-block>


</nu-flow>
