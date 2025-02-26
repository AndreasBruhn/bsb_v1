/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { CartContext } from '../context/shopContext';
import { formatter } from '../utils/helpers';

// Tailwindcss Shopping Cart component -> https://tailwindui.com/components/ecommerce/components/shopping-carts
export default function MiniCart({ cart }) {
	console.log(cart);
	const cancelButtonRef = useRef();
	const { cartOpen, setCartOpen, checkoutUrl, removeCartItem } = useContext(CartContext);

	let cartTotal = 0; // initial cart value

	cart.map((item) => {
		cartTotal += item?.variantPrice * item?.variantQuantity;
	});

	return (
		<Transition.Root show={cartOpen} as={Fragment}>
			<Dialog
				initialFocus={cancelButtonRef} // prevent an error on reload for focusTrap
				as='div'
				className='fixed z-50'
				onClose={() => {
					setCartOpen(!setCartOpen); // close the cart
				}}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-in-out duration-500'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in-out duration-500'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-hidden'>
					<div className='absolute inset-0 overflow-hidden'>
						<div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
							<Transition.Child
								as={Fragment}
								enter='transform transition ease-in-out duration-500 sm:duration-700'
								enterFrom='translate-x-full'
								enterTo='translate-x-0'
								leave='transform transition ease-in-out duration-500 sm:duration-700'
								leaveFrom='translate-x-0'
								leaveTo='translate-x-full'
							>
								<Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
									<div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
										<div className='flex-1 overflow-y-auto py-6 px-4 sm:px-6'>
											<div className='flex items-start justify-between'>
												<Dialog.Title className='text-lg font-medium text-gray-900'>
													{' '}
													Shopping cart{' '}
												</Dialog.Title>
												<div className='ml-3 flex h-7 items-center'>
													<button
														ref={cancelButtonRef}
														type='button'
														className='m-2 p-2 text-gray-400 hover:text-gray-500'
														onClick={() => setCartOpen(false)}
													>
														<span className='sr-only'>Close panel</span>
														<XIcon className='h-6 w-6' aria-hidden='true' />
													</button>
												</div>
											</div>

											<div className='mt-8'>
												<div className='flow-root'>
													{cart.length > 0 ? (
														<ul role='list' className='-my-6 divide-y divide-gray-200'>
															{cart.map(
																(product) => (
																	console.log(product),
																	(
																		<li key={product.id + Math.random()} className='flex py-6'>
																			<div className='relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
																				<Image
																					src={product.image}
																					alt={product.title}
																					layout='fill'
																					objectFit='contain'
																				/>
																			</div>

																			<div className='ml-4 flex flex-1 flex-col'>
																				<div>
																					<div className='flex justify-between text-base font-medium text-gray-900'>
																						<h3>
																							<Link href={`/products/${product.handle}`} passHref>
																								<a onClick={() => setCartOpen(false)}>
																									{' '}
																									{product.title}{' '}
																								</a>
																							</Link>
																						</h3>
																						<p className='ml-4'>
																							{formatter.format(product.variantPrice)}
																						</p>
																					</div>
																					<p className='mt-1 text-sm text-gray-500'>
																						{product.variantTitle}
																					</p>
																				</div>
																				<div className='flex flex-1 items-end justify-between text-sm'>
																					<p className='text-gray-500'>
																						Antal: {product.variantQuantity}
																					</p>

																					<div className='flex'>
																						<button
																							onClick={() => removeCartItem(product.id)}
																							type='button'
																							className='font-medium text-indigo-600 hover:text-indigo-500'
																						>
																							Fjern vare
																						</button>
																					</div>
																				</div>
																			</div>
																		</li>
																	)
																)
															)}
														</ul>
													) : (
														<div>Du har ikke noget i kurven.</div>
													)}
												</div>
											</div>
										</div>

										{/* CONDITIONAL CHECK -> if cart is greater than 0 show div otherwise equal to null */}
										{cart.length > 0 ? (
											<div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
												<div className='flex justify-between text-base font-medium text-gray-900'>
													<p>Subtotal</p>
													<p>{formatter.format(cartTotal)}</p>
												</div>
												<p className='mt-0.5 text-sm text-gray-500'>
													Forsendelse og afgifter beregnes ved kassen.
												</p>
												<div className='mt-6'>
													<a
														href={checkoutUrl}
														className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
													>
														Gå til betaling
													</a>
												</div>
												<div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
													<p>
														eller{' '}
														<button
															type='button'
															className='font-medium hover:text-gray-800'
															onClick={() => setCartOpen(false)}
														>
															Fortsæt med at shoppe<span aria-hidden='true'> &rarr;</span>
														</button>
													</p>
												</div>
											</div>
										) : null}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
