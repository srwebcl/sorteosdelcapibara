import crypto from 'crypto'

const FLOW_API_URL = process.env.FLOW_API_URL || 'https://sandbox.flow.cl/api'
const FLOW_API_KEY = process.env.FLOW_API_KEY || ''
const FLOW_SECRET_KEY = process.env.FLOW_SECRET_KEY || ''

/**
 * Genera la firma criptográfica requerida por Flow.cl
 * Ordena las llaves alfabéticamente, concatena valores y firma con HMAC-SHA256
 */
const signParams = (params: Record<string, string | number>): string => {
  const sortedKeys = Object.keys(params).sort()
  const stringToSign = sortedKeys.map((key) => `${key}${params[key]}`).join('')
  
  return crypto
    .createHmac('sha256', FLOW_SECRET_KEY)
    .update(stringToSign)
    .digest('hex')
}

/**
 * Llama a /api/payment/create para inicializar un pago
 */
export const createPayment = async (data: {
  commerceOrder: string
  subject: string
  currency: string
  amount: number
  email: string
  urlConfirmation: string
  urlReturn: string
}) => {
  const params: Record<string, string | number> = {
    apiKey: FLOW_API_KEY,
    commerceOrder: data.commerceOrder,
    subject: data.subject,
    currency: data.currency,
    amount: data.amount,
    email: data.email,
    urlConfirmation: data.urlConfirmation,
    urlReturn: data.urlReturn,
  }

  const s = signParams(params)
  const body = new URLSearchParams()
  
  Object.keys(params).forEach((key) => {
    body.append(key, String(params[key]))
  })
  body.append('s', s)

  const response = await fetch(`${FLOW_API_URL}/payment/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Error Flow createPayment:', errorBody)
    throw new Error(`Flow API Error: ${response.statusText}`)
  }

  const result = await response.json()
  return result
}

/**
 * Llama a /api/payment/getStatus para verificar si un pago fue completado
 */
export const getPaymentStatus = async (token: string) => {
  const params: Record<string, string | number> = {
    apiKey: FLOW_API_KEY,
    token: token,
  }

  const s = signParams(params)
  
  const queryParams = new URLSearchParams()
  Object.keys(params).forEach((key) => {
    queryParams.append(key, String(params[key]))
  })
  queryParams.append('s', s)

  const response = await fetch(`${FLOW_API_URL}/payment/getStatus?${queryParams.toString()}`, {
    method: 'GET',
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Error Flow getPaymentStatus:', errorBody)
    throw new Error(`Flow API Error: ${response.statusText}`)
  }

  const result = await response.json()
  return result
}
